// local-api.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// Local stand-ins for the handful of `/api/*` routes that upstream's cloud
// backend served and whose CLIENT UI is fully built in the studio:
//
//   GET  /api/upload?type=image|video|storage   Media gallery + the picker's
//                                               Upload tab — lists public/assets.
//   GET  /api/snapshots                         Backups panel — git commits
//   PATCH /api/snapshots/:sha                   that touched the project dir.
//   POST /api/snapshots/:sha/restore            Labels live in
//   DELETE /api/snapshots/:sha                  .revyme/snapshot-labels.json.
//   GET  /api/export/:format/:id                Zip of the project directory.
//   *    /api/ab-tests…                         501 with a real message — the
//                                               Pages-tree menu fires these
//                                               ungated, and a bare 404 landed
//                                               in an alert().
//
// Mounted on the editor server only (same origin as the studio, behind the
// access gate). Everything routes through disk-project's project root and,
// for restore, its manifest bookkeeping + relay fan-out.

import type { Plugin, Connect } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import type { ServerResponse } from 'node:http';
import { projectRoot, overwriteProjectFiles, publishProject } from './disk-project';

const execFileP = promisify(execFile);

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const LABELS_REL = '.revyme/snapshot-labels.json';

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

function readBody(req: Connect.IncomingMessage, limit = 64 * 1024): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c: Buffer) => { data += c; if (data.length > limit) { resolve(''); req.destroy(); } });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

// ─── Media ───────────────────────────────────────────────────────────────────

async function handleUploads(url: URL, res: ServerResponse): Promise<void> {
  const root = projectRoot();
  const dir = path.join(root, 'public', 'assets');
  const type = url.searchParams.get('type') ?? 'image';
  let names: string[] = [];
  try { names = await fsp.readdir(dir); } catch { /* no uploads yet */ }
  const stats = await Promise.all(names.map(async (n) => {
    try { return { n, st: await fsp.stat(path.join(dir, n)) }; } catch { return null; }
  }));
  const files = stats.filter((x): x is { n: string; st: fs.Stats } => !!x && x.st.isFile());

  if (type === 'storage') {
    const used = files.reduce((s, f) => s + f.st.size, 0);
    let limitMB = 10240;
    try {
      const sf = await fsp.statfs(root);
      limitMB = Math.round((used + sf.bavail * sf.bsize) / (1024 * 1024));
    } catch { /* statfs unsupported — keep the nominal limit */ }
    sendJson(res, 200, { currentUsageMB: Math.round((used / (1024 * 1024)) * 10) / 10, storageLimitMB: limitMB });
    return;
  }
  const want = type === 'video' ? VIDEO_EXT : IMAGE_EXT;
  const uploads = files
    .filter((f) => want.has(path.extname(f.n).toLowerCase()))
    .sort((a, b) => b.st.mtimeMs - a.st.mtimeMs)
    .map((f) => ({
      url: `/assets/${f.n}`,
      key: `/assets/${f.n}`, // what DiskBackend.deleteAssets expects
      size: f.st.size,
      lastModified: f.st.mtime.toISOString(),
    }));
  sendJson(res, 200, { uploads });
}

// ─── Backups (git) ───────────────────────────────────────────────────────────

async function readLabels(root: string): Promise<Record<string, string>> {
  try { return JSON.parse(await fsp.readFile(path.join(root, LABELS_REL), 'utf8')); } catch { return {}; }
}
async function writeLabels(root: string, labels: Record<string, string>): Promise<void> {
  const p = path.join(root, LABELS_REL);
  await fsp.mkdir(path.dirname(p), { recursive: true });
  await fsp.writeFile(p, JSON.stringify(labels, null, 2) + '\n');
}

async function listSnapshots(res: ServerResponse): Promise<void> {
  const root = projectRoot();
  const git = (...args: string[]) => execFileP('git', ['-C', root, ...args], { maxBuffer: 8 * 1024 * 1024 });
  let log = '';
  try {
    ({ stdout: log } = await git('log', '--format=%H%x1f%cI%x1f%s%x1f%an', '-n', '200', '--', '.'));
  } catch (err: any) {
    sendJson(res, 400, { error: { message: `not a git repository: ${String(err?.stderr ?? err?.message).slice(0, 200)}` } });
    return;
  }
  const labels = await readLabels(root);
  const rows = log.split('\n').filter(Boolean).map((line) => line.split('\x1f'));
  let liveSnapshotId: string | null = null;
  try {
    // The live site deploys from what origin has: the newest LISTED commit
    // (one that touched the project dir) that origin already contains.
    const { stdout } = await git('rev-parse', '--abbrev-ref', 'origin/HEAD');
    const originRef = stdout.trim() || 'origin/main';
    for (const [sha] of rows) {
      const contained = await git('merge-base', '--is-ancestor', sha, originRef).then(() => true, () => false);
      if (contained) { liveSnapshotId = sha; break; }
    }
  } catch { /* no remote */ }
  const snapshots = rows.map((fields) => {
    const line = fields.join('\x1f');
    const [sha, createdAt, subject, author] = line.split('\x1f');
    const isPublish = subject.startsWith('Publish:');
    return {
      id: sha,
      website_id: 'local',
      kind: isPublish ? 'publish' : 'commit',
      deploy_meta: null,
      created_at: createdAt,
      label: labels[sha] ?? (isPublish ? null : subject),
      created_by: { id: 'git', name: author, avatar: null },
    };
  });
  sendJson(res, 200, { snapshots, effectivePlan: 'studio', liveSnapshotId });
}

async function restoreSnapshot(sha: string, target: string, res: ServerResponse): Promise<void> {
  const root = projectRoot();
  if (!/^[0-9a-f]{7,40}$/i.test(sha)) { sendJson(res, 400, { error: { message: 'bad snapshot id' } }); return; }
  const git = (...args: string[]) => execFileP('git', ['-C', root, ...args], { maxBuffer: 64 * 1024 * 1024 });
  // Path of the project dir inside the repo, so `git show sha:<prefix>/rel` resolves.
  const { stdout: top } = await git('rev-parse', '--show-toplevel');
  const prefix = path.relative(top.trim(), root).split(path.sep).join('/');
  const withPrefix = (rel: string) => (prefix ? `${prefix}/${rel}` : rel);

  let manifest: { files?: string[] } | null = null;
  try { manifest = JSON.parse(await fsp.readFile(path.join(root, '.revyme/manifest.json'), 'utf8')); } catch { /* handled below */ }
  const rels = manifest?.files ?? [];
  if (rels.length === 0) { sendJson(res, 409, { error: { message: 'no manifest — cannot restore into an unmanaged project' } }); return; }

  const files: Record<string, string> = {};
  for (const rel of rels) {
    try {
      const { stdout } = await git('show', `${sha}:${withPrefix(rel)}`);
      files[rel] = stdout;
    } catch { /* file did not exist at that commit — leave the current one alone */ }
  }
  let changed: string[] = [];
  try {
    ({ changed } = await overwriteProjectFiles(files));
  } catch (err: any) {
    sendJson(res, 500, { error: { message: String(err?.message ?? err) } });
    return;
  }
  let published: unknown = null;
  if (target === 'live' || target === 'both') {
    const r = await publishProject(`restore ${sha.slice(0, 7)}`);
    if (!r.ok) { sendJson(res, r.status, { error: { message: r.error }, changed }); return; }
    published = r;
  }
  sendJson(res, 200, { ok: true, sha, target, changed, published });
}

// ─── Export ──────────────────────────────────────────────────────────────────

function exportZip(format: string, res: ServerResponse): void {
  if (format !== 'source') { sendJson(res, 501, { error: { message: 'This export format is coming soon.' } }); return; }
  const root = projectRoot();
  const name = `${path.basename(root)}-source.zip`;
  res.statusCode = 200;
  res.setHeader('content-type', 'application/zip');
  res.setHeader('content-disposition', `attachment; filename="${name}"`);
  const zip = spawn('zip', ['-r', '-q', '-', '.', '-x', 'node_modules/*', '.next/*', '.git/*', '*.tsbuildinfo', '.DS_Store'], { cwd: root });
  zip.stdout.pipe(res);
  zip.on('error', () => { if (!res.headersSent) sendJson(res, 500, { error: { message: 'zip is not available on this machine' } }); else res.end(); });
}

// ─── Plugin ──────────────────────────────────────────────────────────────────

export function localApi(): Plugin {
  return {
    name: 'revyme-local-api',
    configureServer(server) { mount(server); },
    configurePreviewServer(server) { mount(server); },
  };

  function mount(server: { middlewares: Connect.Server }) {
    server.middlewares.use((req, res, next) => {
      const raw = req.url ?? '/';
      if (!raw.startsWith('/api/')) return next();
      const url = new URL(raw, 'http://local');
      const p = url.pathname;
      const m = req.method ?? 'GET';
      const run = (fn: () => Promise<void> | void) => {
        Promise.resolve()
          .then(fn)
          .catch((err) => { if (!res.headersSent) sendJson(res, 500, { error: { message: String(err?.message ?? err) } }); });
      };

      if (p === '/api/upload' && m === 'GET') return run(() => handleUploads(url, res));

      if (p === '/api/snapshots' && m === 'GET') return run(() => listSnapshots(res));
      const snap = p.match(/^\/api\/snapshots\/([^/]+)(\/restore)?$/);
      if (snap) {
        const sha = snap[1];
        if (snap[2] && m === 'POST') {
          return run(async () => {
            let target = 'editor';
            try { target = String(JSON.parse(await readBody(req) || '{}').target ?? 'editor'); } catch { /* default */ }
            await restoreSnapshot(sha, target, res);
          });
        }
        if (m === 'PATCH') {
          return run(async () => {
            const root = projectRoot();
            const body = JSON.parse(await readBody(req) || '{}') as { label?: string | null };
            const labels = await readLabels(root);
            if (body.label) labels[sha] = String(body.label).slice(0, 120); else delete labels[sha];
            await writeLabels(root, labels);
            sendJson(res, 200, { ok: true });
          });
        }
        if (m === 'DELETE') {
          return sendJson(res, 405, { error: { message: 'Backups are git commits — delete them with git, not from here.' } });
        }
      }

      const exp = p.match(/^\/api\/export\/([^/]+)\/[^/]+$/);
      if (exp && m === 'GET') return exportZip(exp[1], res);

      if (p.startsWith('/api/ab-tests')) {
        return sendJson(res, 501, { error: { message: 'A/B tests need the cloud edge runtime and are not available in disk mode.' } });
      }
      return next();
    });
  }
}
