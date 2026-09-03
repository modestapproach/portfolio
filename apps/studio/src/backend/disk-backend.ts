// disk-backend.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// Standalone backend that persists the project to a real directory on disk
// (the monorepo's apps/web) via the dev-server endpoints mounted by
// vite-plugins/disk-project.ts. Everything the disk doesn't change —
// user identity, roles, credits, fonts — inherits from LocalBackend.
//
// Consequences of "the project is a real directory":
// - The ProjectFS snapshot lands as actual .tsx/.css/.json files that git
//   tracks and other tools (Claude Code, next build) edit and consume.
// - Assets are real files under public/assets, served at /assets/* by all
//   three dev servers, so the same URL works in canvas, preview, and the
//   published site. No base64, no localStorage quota.
// - deleteAssets genuinely deletes (LocalBackend's is a no-op).

import type { ProjectData } from './types';
import { LocalBackend } from './local-backend';
import { trace } from '@/shared/debug-trace';
import { toast } from 'sonner';
import { getBaseSavedAt, noteSavedAt, catchUpFromDisk, deviceIdentity } from './disk-sync';

const API = '/__revyme_disk';

export class DiskBackend extends LocalBackend {
  /** Writes to the tab are FORBIDDEN until a load has SUCCEEDED. Throwing
   *  from loadProject alone protects nothing: ProjectLoader catches init
   *  errors and mounts the editor over the default in-memory project, and
   *  the boot machinery autosaves ~2s later — without this gate that PUT
   *  would overwrite the real project on disk with the starter. */
  private loadSucceeded = false;

  /** Whether the browser can complete saveProject during beforeunload.
   *  LocalBackend's localStorage write is synchronous; our fetch is not —
   *  autosave's unload path reads this to pick a keepalive/dialog strategy. */
  readonly unloadSaveIsSynchronous = false;

  /** Only the canonical standalone project ('local', i.e. the / route) lives
   *  on disk. Any other id — File▸New project uuids, /builder/noauth scratch
   *  sessions — keeps upstream's per-id localStorage behavior so it can
   *  never alias apps/web. */
  private onDisk(id: string): boolean {
    return id === 'local';
  }

  async loadProject(id: string): Promise<ProjectData | null> {
    if (!this.onDisk(id)) return super.loadProject(id);
    try {
      const res = await fetch(`${API}/project`);
      if (res.status === 404) {
        this.loadSucceeded = true; // empty dir IS a successful load
        trace.action('backend:load-project', { id, source: 'disk', empty: true });
        return null; // ProjectLoader seeds the starter; first autosave writes it.
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `disk load failed (${res.status})`);
      }
      const data = (await res.json()) as ProjectData & { websiteName?: string | null; savedAt?: string | null };
      const fileCount = data?.files ? Object.keys(data.files).length : 0;
      this.loadSucceeded = true;
      noteSavedAt(data.savedAt); // the base every save from this tab is measured against
      if (fileCount === 0) {
        return null;
      }
      trace.action('backend:load-project', { id, source: 'disk', fileCount });
      return data;
    } catch (err) {
      // loadSucceeded stays false: every subsequent save is refused, so a
      // flaky load can never end in the starter overwriting the real
      // project. The user sees the save errors and reloads.
      trace.error('disk-backend:load-error', { id, error: String(err) });
      toast.error('Could not load the project from disk — fix the error and reload. Edits will NOT be saved.', {
        id: 'disk-load-failed',
        duration: Infinity,
      });
      throw err;
    }
  }

  async saveProject(id: string, data: ProjectData): Promise<void> {
    if (!this.onDisk(id)) return super.saveProject(id, data);
    if (!this.loadSucceeded) {
      trace.error('disk-backend:save-refused', { id, reason: 'no successful load this session' });
      throw new Error('refusing to save: the project never loaded from disk this session');
    }
    const res = await fetch(`${API}/project`, {
      method: 'PUT',
      // `x-revyme-device`: who is saving, so the relay's fan-out of this
      // save skips this tab.
      headers: { 'content-type': 'application/json', 'x-revyme-device': deviceIdentity().id },
      // `baseSavedAt`: what this tab last synced to. The server refuses a
      // snapshot that is behind the disk — see disk-sync.ts.
      body: JSON.stringify({ ...data, baseSavedAt: getBaseSavedAt() }),
    });
    if (res.status === 409) {
      const body = (await res.json().catch(() => null)) as { conflicts?: string[]; stale?: boolean } | null;
      if (body?.stale) {
        // Another tab saved since this one last synced. Take the disk's
        // state rather than putting ours back over it; the user's local
        // edits since then are the price of having been out of sync.
        trace.error('disk-backend:save-stale', { id, base: getBaseSavedAt() });
        toast.error('Saved elsewhere since this tab last synced — catching up with the disk.', {
          id: 'disk-conflict',
          duration: 6000,
        });
        void catchUpFromDisk();
        throw new Error('disk save stale');
      }
      // Files changed on disk (Claude Code / git / editor) since the studio
      // last saved. Do NOT clobber: tell the user to reload so the external
      // edits flow into the canvas.
      const list = body?.conflicts?.slice(0, 3).join(', ') ?? 'files';
      toast.error(`Changed on disk: ${list} — reload the studio to pick the edits up.`, {
        id: 'disk-conflict',
        duration: 10000,
      });
      trace.error('disk-backend:save-conflict', { id, conflicts: body?.conflicts });
      throw new Error('disk save conflict');
    }
    if (!res.ok) {
      trace.error('disk-backend:save-error', { id, status: res.status });
      throw new Error(`disk save failed (${res.status})`);
    }
    const saved = (await res.json().catch(() => null)) as { savedAt?: string } | null;
    noteSavedAt(saved?.savedAt);
    trace.action('backend:save-project', {
      id,
      source: 'disk',
      fileCount: Object.keys(data.files).length,
    });
  }

  /** Best-effort unload save: keepalive survives the page teardown but
   *  shares sendBeacon's ~64KB quota. Returns false when the payload is too
   *  big (caller falls back to the leave-confirmation dialog) — and refuses
   *  outright when no load succeeded, same as saveProject. */
  trySaveOnUnload(id: string, data: ProjectData): boolean {
    if (!this.onDisk(id) || !this.loadSucceeded) return false;
    const body = JSON.stringify(data);
    if (new Blob([body]).size > 60 * 1024) return false;
    void fetch(`${API}/project`, {
      method: 'PUT',
      keepalive: true,
      headers: { 'content-type': 'application/json' },
      body,
    }).catch(() => undefined); // page is going away; 409s fail safe
    return true;
  }

  async uploadAsset(id: string, file: File): Promise<string> {
    if (!this.onDisk(id)) return super.uploadAsset(id, file);
    const res = await fetch(`${API}/asset`, {
      method: 'POST',
      headers: {
        'content-type': 'application/octet-stream',
        'x-revyme-filename': encodeURIComponent(file.name || 'asset'),
      },
      body: file,
    });
    if (!res.ok) throw new Error(`asset upload failed (${res.status})`);
    const { url } = (await res.json()) as { url: string };
    trace.action('backend:upload-asset', { source: 'disk', name: file.name, bytes: file.size, url });
    return url;
  }

  async deleteAssets(id: string, keys: string[]): Promise<void> {
    if (!this.onDisk(id)) return super.deleteAssets(id, keys);
    const res = await fetch(`${API}/assets-delete`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ keys }),
    });
    if (!res.ok) throw new Error(`asset delete failed (${res.status})`);
    trace.action('backend:delete-assets', { source: 'disk', count: keys.length });
  }

  async renameWebsite(id: string, name: string): Promise<void> {
    if (!this.onDisk(id)) return super.renameWebsite(id, name);
    await fetch(`${API}/website-name`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name }),
    }).catch(() => undefined); // cosmetic metadata — never block a rename on it
    trace.action('backend:rename-website', { id, name, source: 'disk' });
  }

  async getWebsiteName(id: string): Promise<string | null> {
    if (!this.onDisk(id)) return super.getWebsiteName(id);
    try {
      // Lightweight endpoint — never the full file map; this runs on every
      // boot in parallel with the real load.
      const res = await fetch(`${API}/website-name`);
      if (!res.ok) return null;
      const data = (await res.json()) as { websiteName?: string | null };
      return data.websiteName ?? null;
    } catch {
      return null;
    }
  }
}
