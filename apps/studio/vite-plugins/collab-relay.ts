// collab-relay.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The Socket.IO server the studio's live-collaboration client expects.
// Upstream points src/canvas/collab/CollaborationProvider.tsx at Revyme's
// hosted backend (backend/src/realtime/setup.ts); this fork has no such
// backend, so two studio tabs — the Mac mini's and a laptop's — each held
// their own copy of the project and only ever met on disk. This relay is
// the minimal server half of that protocol, attached to the editor's own
// http server, so every tab sees every edit within the client's 50ms sync
// debounce, plus cursors and selections.
//
// Two responsibilities beyond fan-out:
//   · PERSIST. A tab applies a remote write outside its mutation queue, so
//     nothing on the receiving side autosaves it; upstream's backend wrote
//     it to the database. Here each file-sync is written to disk through
//     disk-project's manifest bookkeeping (see persistRemoteFile).
//   · ELECT a save leader — the one tab that also runs full-snapshot
//     autosaves. First to join leads; on leave the earliest remaining tab
//     takes over and the room is told.
//
// Identity: there are no accounts. Each browser sends a stable device id
// and a short name on join; the server assigns a color by join order. The
// handshake is admitted by the access gate's own test (loopback/tailnet
// trusted, otherwise the unlock cookie), so the tunnel never exposes an
// unauthenticated write channel.

import type { Plugin } from 'vite';
import type { Server as HttpServer } from 'node:http';
import { Server as IOServer, type Socket } from 'socket.io';
import { authorizeRequest } from './access-gate';
import { persistRemoteFile, setSaveBroadcaster } from './disk-project';

interface ActiveUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: 'editor' | 'viewer';
  color: string;
  source: 'owner' | 'workspace' | 'collaborator';
  socketId: string;
}

interface Member { user: ActiveUser; joinedAt: number }

const COLORS = ['#ff5c33', '#22c55e', '#3b82f6', '#a855f7', '#eab308', '#ec4899', '#14b8a6'];

export function collabRelay(): Plugin {
  return {
    name: 'revyme-collab-relay',
    configureServer(server) { attach(server.httpServer); },
    configurePreviewServer(server) { attach(server.httpServer); },
  };
}

function attach(httpServer: unknown): void {
  if (!httpServer) return;
  // Vite types `httpServer` as http | http2 secure; this fork serves plain
  // http behind cloudflared, and Socket.IO accepts either at runtime.
  const io = new IOServer(httpServer as HttpServer, {
    path: '/socket.io',
    serveClient: false,
    allowRequest: (req, cb) => {
      void authorizeRequest(req).then((ok) => {
        if (!ok) {
          // eslint-disable-next-line no-console
          console.warn(`[collab-relay] refused handshake from ${req.socket.remoteAddress}`);
        }
        cb(null, ok);
      });
    },
  });

  /** websiteId → socketId → member */
  const rooms = new Map<string, Map<string, Member>>();
  let colorCursor = 0;

  const members = (websiteId: string) => rooms.get(websiteId) ?? new Map<string, Member>();
  const leaderOf = (websiteId: string): string | null => {
    let best: Member | null = null;
    for (const m of members(websiteId).values()) {
      if (!best || m.joinedAt < best.joinedAt) best = m;
    }
    return best?.user.id ?? null;
  };

  // A full-snapshot save (the path canvas edits take to disk) fans out to
  // every tab except the saver. Rooms are per websiteId but disk mode has
  // one project, so every room hears it.
  setSaveBroadcaster(({ changed, deleted, savedAt, deviceId }) => {
    let sent = 0;
    for (const [roomId, room] of rooms) {
      for (const [socketId, m] of room) {
        if (deviceId && m.user.id === deviceId) continue;
        const s = io.sockets.sockets.get(socketId);
        if (!s) continue;
        for (const [path, content] of Object.entries(changed)) {
          s.emit('file-sync', { userId: deviceId ?? 'save', path, content, savedAt });
        }
        for (const path of deleted) s.emit('file-delete', { userId: deviceId ?? 'save', path, savedAt });
        sent++;
      }
      void roomId;
    }
    if (sent > 0) {
      // eslint-disable-next-line no-console
      console.log(`[collab-relay] save fan-out: ${Object.keys(changed).length} changed, ${deleted.length} deleted → ${sent} tab(s)`);
    }
  });

  io.on('connection', (socket: Socket) => {
    let websiteId: string | null = null;
    let user: ActiveUser | null = null;

    const leave = () => {
      if (!websiteId || !user) return;
      const room = rooms.get(websiteId);
      room?.delete(socket.id);
      socket.to(websiteId).emit('user-left', { socketId: socket.id, userId: user.id });
      if (room && room.size === 0) rooms.delete(websiteId);
      else io.to(websiteId).emit('save-leader', { leader: leaderOf(websiteId) });
      void socket.leave(websiteId);
      // eslint-disable-next-line no-console
      console.log(`[collab-relay] ${user.name} left ${websiteId} (${room?.size ?? 0} remaining)`);
      websiteId = null;
      user = null;
    };

    socket.on(
      'join',
      (
        payload: { websiteId?: string; device?: { id?: string; name?: string } },
        ack?: (res: { ok: boolean; users?: ActiveUser[]; leader?: string | null; error?: string }) => void,
      ) => {
        const id = String(payload?.websiteId ?? '');
        if (!id) { ack?.({ ok: false, error: 'websiteId required' }); return; }
        if (websiteId) leave();
        websiteId = id;
        const deviceId = String(payload?.device?.id ?? socket.id).slice(0, 64);
        const name = String(payload?.device?.name ?? 'Studio tab').slice(0, 40);
        user = {
          id: deviceId,
          email: '',
          name,
          avatar: null,
          role: 'editor',
          color: COLORS[colorCursor++ % COLORS.length],
          source: 'owner',
          socketId: socket.id,
        };
        const room = rooms.get(id) ?? new Map<string, Member>();
        room.set(socket.id, { user, joinedAt: Date.now() });
        rooms.set(id, room);
        void socket.join(id);
        const users = [...room.values()].map(m => m.user);
        const leader = leaderOf(id);
        socket.to(id).emit('user-joined', user);
        io.to(id).emit('save-leader', { leader });
        // eslint-disable-next-line no-console
        console.log(`[collab-relay] ${name} joined ${id} (${room.size} online, leader ${leader})`);
        ack?.({ ok: true, users, leader });
      },
    );

    socket.on('leave', () => leave());
    socket.on('disconnect', () => leave());

    // Every persisted write carries the new manifest `savedAt` — the sync
    // base each tab must present on its next full save. Peers get it on the
    // broadcast; the sender gets it back on `file-persisted`.
    socket.on('file-sync', async (p: { websiteId?: string; path?: string; content?: string }) => {
      if (!websiteId || !user || typeof p?.path !== 'string' || typeof p?.content !== 'string') return;
      const savedAt = await persistRemoteFile(p.path, p.content);
      if (!savedAt) {
        // eslint-disable-next-line no-console
        console.warn(`[collab-relay] refused to persist ${p.path} (unsafe path or no manifest)`);
        return;
      }
      socket.to(websiteId).emit('file-sync', { userId: user.id, path: p.path, content: p.content, savedAt });
      socket.emit('file-persisted', { path: p.path, savedAt });
    });

    socket.on('file-delete', async (p: { websiteId?: string; path?: string }) => {
      if (!websiteId || !user || typeof p?.path !== 'string') return;
      const savedAt = await persistRemoteFile(p.path, null);
      if (!savedAt) return;
      socket.to(websiteId).emit('file-delete', { userId: user.id, path: p.path, savedAt });
      socket.emit('file-persisted', { path: p.path, savedAt });
    });

    socket.on('cursor', (p: { x?: number; y?: number; page?: string }) => {
      if (!websiteId || !user || typeof p?.x !== 'number' || typeof p?.y !== 'number') return;
      socket.to(websiteId).volatile.emit('cursor', { userId: user.id, x: p.x, y: p.y, page: p.page });
    });

    socket.on('selection', (p: { nodeIds?: string[]; page?: string }) => {
      if (!websiteId || !user || !Array.isArray(p?.nodeIds)) return;
      socket.to(websiteId).emit('selection', { userId: user.id, nodeIds: p.nodeIds.slice(0, 500), page: p.page });
    });

    socket.on('color-change', (p: { userId?: string; color?: string }) => {
      if (!websiteId || typeof p?.userId !== 'string' || typeof p?.color !== 'string') return;
      for (const m of members(websiteId).values()) if (m.user.id === p.userId) m.user.color = p.color;
      io.to(websiteId).emit('color-change', { userId: p.userId, color: p.color });
    });
  });

  // eslint-disable-next-line no-console
  console.log('[collab-relay] live sync ready at /socket.io');
}
