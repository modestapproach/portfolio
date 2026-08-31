// disk-project.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// Serves a real on-disk Next.js project directory to the editor, replacing
// localStorage as the standalone persistence layer. Two exports:
//
//   diskProjectApi()    — mount ONLY on the editor server (3333). REST-ish
//                         endpoints under /__revyme_disk/* for project
//                         load/save and asset upload/delete.
//   diskProjectAssets() — mount on ALL THREE servers (editor 3333, canvas
//                         sandbox 5174, preview 5175). Serves the project's
//                         public/ directory at /assets/* so asset URLs
//                         written into the JSX resolve identically in the
//                         canvas, the preview, and the published site.
//
// The project directory defaults to ../web relative to this app (the
// monorepo's apps/web) and can be overridden with REVYME_PROJECT_DIR.
//
// Design constraints:
// - The ProjectFS snapshot ({ path: content }) is authoritative ONLY for
//   files it manages. package.json, wrangler config, public/assets and
//   anything else living in apps/web must survive saves untouched. A
//   manifest at .revyme/manifest.json records the managed file list; a
//   save deletes exactly (manifest − payload), never anything else.
// - Every client-supplied path is validated: relative, no `..`, no null
//   bytes, resolves under the project root. Asset filenames are reduced
//   to a sanitized basename.
// - Dev-server only. Vite binds localhost by default; do not add this to
//   any production build path.

import type { Plugin, Connect } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ServerResponse } from 'node:http';

const execFileP = promisify(execFile);

const API_PREFIX = '/__revyme_disk';
const ASSETS_URL_PREFIX = '/assets/';

function projectRoot(): string {
  const fromEnv = process.env.REVYME_PROJECT_DIR;
  const root = fromEnv
    ? path.resolve(fromEnv)
    : path.resolve(__dirname, '..', '..', 'web');
  return root;
}

const MANIFEST_REL = '.revyme/manifest.json';

interface Manifest {
  format: string;
  files: string[];
  settings?: unknown;
  websiteName?: string;
  savedAt?: string;
  /** sha1 of each managed file AS LAST WRITTEN BY THE STUDIO. Lets a save
   *  detect files changed externally (Claude Code, git, an editor) since the
   *  studio last touched them, and refuse to clobber that work. */
  hashes?: Record<string, string>;
}

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

/** Resolve a client-supplied relative path under root, or return null. */
function safeResolve(root: string, rel: string): string | null {
  if (typeof rel !== 'string' || rel.length === 0 || rel.length > 4096) return null;
  if (rel.includes('\0')) return null;
  if (path.isAbsolute(rel)) return null;
  const resolved = path.resolve(root, rel);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  return resolved;
}

/** Basename-only, conservative charset, never hidden, never empty. */
function sanitizeAssetName(name: string): string {
  const base = path.basename(name).replace(/[^\w.\-]+/g, '_').replace(/^\.+/, '');
  return base || 'asset';
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const buf = Buffer.from(JSON.stringify(body));
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.setHeader('content-length', String(buf.length));
  res.end(buf);
}

function readBody(req: Connect.IncomingMessage, limitBytes: number): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let total = 0;
    req.on('data', (c: Buffer) => {
      total += c.length;
      if (total > limitBytes) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', () => resolve(null));
  });
}

type ManifestRead = { state: 'ok'; manifest: Manifest } | { state: 'missing' } | { state: 'corrupt' };

async function readManifestState(root: string): Promise<ManifestRead> {
  let raw: string;
  try {
    raw = await fsp.readFile(path.join(root, MANIFEST_REL), 'utf8');
  } catch {
    return { state: 'missing' };
  }
  try {
    const m = JSON.parse(raw) as Manifest;
    return Array.isArray(m.files) ? { state: 'ok', manifest: m } : { state: 'corrupt' };
  } catch {
    // The file exists but does not parse: NEVER treat as "no project" —
    // that would let a fresh-starter save clobber real managed files.
    return { state: 'corrupt' };
  }
}

async function readManifest(root: string): Promise<Manifest | null> {
  const r = await readManifestState(root);
  return r.state === 'ok' ? r.manifest : null;
}

/** Files the studio always manages — used to detect an unmanaged (manifest-
 *  less) project already on disk, which a starter save must not overwrite. */
const SENTINEL_FILES = ['app/page.client.tsx', 'app/page.tsx', 'app/layout.tsx'];

/** In-process write mutex: the mutating API lives ONLY on the editor server
 *  (one Node process), so a promise chain fully serializes save/rename/
 *  upload/delete and removes every manifest read-modify-write race. */
let writeChain: Promise<void> = Promise.resolve();
function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function writeManifest(root: string, m: Manifest): Promise<void> {
  const target = path.join(root, MANIFEST_REL);
  await fsp.mkdir(path.dirname(target), { recursive: true });
  const tmp = target + '.tmp';
  await fsp.writeFile(tmp, JSON.stringify(m, null, 2));
  await fsp.rename(tmp, target);
}

/** GET /__revyme_disk/project → { format, files, settings } | 404 */
async function handleLoad(res: ServerResponse): Promise<void> {
  const root = projectRoot();
  const read = await readManifestState(root);
  if (read.state === 'corrupt') {
    sendJson(res, 500, {
      error: `manifest unreadable (${MANIFEST_REL}) — fix or delete it; refusing to pretend the project is empty`,
    });
    return;
  }
  if (read.state === 'missing') {
    for (const rel of SENTINEL_FILES) {
      if (fs.existsSync(path.join(root, rel))) {
        sendJson(res, 412, {
          error: `project files exist on disk but ${MANIFEST_REL} is missing — restore it from git (or delete the files) before opening the studio`,
        });
        return;
      }
    }
    sendJson(res, 404, { error: 'no project on disk yet' });
    return;
  }
  const manifest = read.manifest;
  const files: Record<string, string> = {};
  for (const rel of manifest.files) {
    const abs = safeResolve(root, rel);
    if (!abs) continue;
    try {
      files[rel] = await fsp.readFile(abs, 'utf8');
    } catch {
      // A managed file missing on disk (user deleted it): drop it from the
      // snapshot rather than failing the whole load.
    }
  }
  if (Object.keys(files).length === 0) {
    sendJson(res, 404, { error: 'manifest lists no readable files' });
    return;
  }
  sendJson(res, 200, {
    format: manifest.format ?? 'revyme-v1',
    files,
    settings: manifest.settings,
    websiteName: manifest.websiteName ?? null,
  });
}

/** PUT /__revyme_disk/project ← { format, files, settings } */
async function handleSave(req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await readBody(req, 64 * 1024 * 1024);
  if (!body) {
    sendJson(res, 413, { error: 'body too large or unreadable' });
    return;
  }
  let data: { format?: string; files?: Record<string, string>; settings?: unknown };
  try {
    data = JSON.parse(body.toString('utf8'));
  } catch {
    sendJson(res, 400, { error: 'invalid JSON' });
    return;
  }
  const files = data.files;
  if (!files || typeof files !== 'object' || Array.isArray(files)) {
    sendJson(res, 400, { error: 'missing files map' });
    return;
  }
  const root = projectRoot();
  const prev = await readManifest(root);
  const nextPaths: string[] = [];
  const hashes: Record<string, string> = {};

  // Conflict pass BEFORE any write: a managed file whose on-disk content no
  // longer matches the hash the studio last wrote — i.e. it was edited
  // externally (Claude Code, git, a text editor) — must not be silently
  // clobbered by a stale canvas snapshot. The client gets a 409 and reloads
  // so the external edit flows INTO the canvas instead of under it.
  // `force=1` (the client's explicit choice) overrides.
  const force = /(?:\?|&)force=1(?:&|$)/.test((req.url ?? ''));
  if (!force) {
    const conflicts: string[] = [];
    if (prev?.hashes) {
      for (const [rel, content] of Object.entries(files)) {
        const known = prev.hashes[rel];
        if (!known) continue; // new file — nothing to conflict with
        const abs = safeResolve(root, rel);
        if (!abs) continue;
        let onDisk: string | null = null;
        try {
          onDisk = await fsp.readFile(abs, 'utf8');
        } catch {
          continue; // deleted externally; the incoming write recreates it
        }
        if (sha1(onDisk) !== known && onDisk !== content) conflicts.push(rel);
      }
      // Deletion candidates: a managed file ABSENT from the snapshot is about
      // to be unlinked — but only if the studio still owns its content. If it
      // was edited externally since our last write, deleting it destroys that
      // work: conflict instead. Checked here, pre-write, to keep saves atomic.
      for (const rel of prev.files) {
        if (rel in files) continue;
        const known = prev.hashes[rel];
        if (!known) continue;
        const abs = safeResolve(root, rel);
        if (!abs) continue;
        let onDisk: string | null = null;
        try {
          onDisk = await fsp.readFile(abs, 'utf8');
        } catch {
          continue; // already gone — unlink below is a no-op
        }
        if (sha1(onDisk) !== known) conflicts.push(rel);
      }
    } else {
      // No manifest (fresh seed / manifest deleted): refuse to overwrite ANY
      // pre-existing file whose content differs. A genuine first save writes
      // only new paths and sails through; a starter snapshot aimed at a real
      // project 409s instead of wiping it.
      for (const [rel, content] of Object.entries(files)) {
        const abs = safeResolve(root, rel);
        if (!abs) continue;
        let onDisk: string | null = null;
        try {
          onDisk = await fsp.readFile(abs, 'utf8');
        } catch {
          continue; // does not exist — safe to create
        }
        if (onDisk !== content) conflicts.push(rel);
      }
    }
    if (conflicts.length > 0) {
      sendJson(res, 409, { error: 'files changed on disk since last studio save', conflicts });
      return;
    }
  }

  for (const [rel, content] of Object.entries(files)) {
    const abs = safeResolve(root, rel);
    if (!abs || typeof content !== 'string') {
      sendJson(res, 400, { error: `unsafe or invalid path: ${rel}` });
      return;
    }
    nextPaths.push(rel);
    hashes[rel] = sha1(content);
    await fsp.mkdir(path.dirname(abs), { recursive: true });
    await fsp.writeFile(abs, content, 'utf8');
  }

  // Delete exactly the files we previously managed that are gone from the
  // snapshot — never anything the manifest doesn't know about.
  if (prev) {
    const keep = new Set(nextPaths);
    for (const rel of prev.files) {
      if (keep.has(rel)) continue;
      const abs = safeResolve(root, rel);
      if (!abs) continue;
      try {
        await fsp.unlink(abs);
      } catch {
        /* already gone */
      }
    }
  }

  await writeManifest(root, {
    format: data.format ?? 'revyme-v1',
    files: nextPaths.sort(),
    settings: data.settings,
    websiteName: prev?.websiteName,
    savedAt: new Date().toISOString(),
    hashes,
  });
  sendJson(res, 200, { ok: true, fileCount: nextPaths.length });
}

/** POST /__revyme_disk/asset (raw bytes, x-revyme-filename header) → { url } */
async function handleAssetUpload(req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const rawName = req.headers['x-revyme-filename'];
  const name = sanitizeAssetName(
    decodeURIComponent(typeof rawName === 'string' ? rawName : 'asset')
  );
  const body = await readBody(req, 256 * 1024 * 1024);
  if (!body || body.length === 0) {
    sendJson(res, 400, { error: 'empty or oversized upload' });
    return;
  }
  const root = projectRoot();
  const dir = path.join(root, 'public', 'assets');
  await fsp.mkdir(dir, { recursive: true });

  // Uniquify with exclusive creates ('wx'): photo.jpg → photo-2.jpg → … The
  // exclusive flag makes the existence check and the write one atomic step,
  // so concurrent uploads of the same name can never overwrite each other.
  const ext = path.extname(name);
  const stem = name.slice(0, name.length - ext.length);
  let candidate = name;
  for (let i = 2; ; i++) {
    try {
      await fsp.writeFile(path.join(dir, candidate), body, { flag: 'wx' });
      break;
    } catch (err: any) {
      if (err?.code !== 'EEXIST') throw err;
      candidate = `${stem}-${i}${ext}`;
    }
  }
  sendJson(res, 200, { url: `${ASSETS_URL_PREFIX}${candidate}` });
}

/** POST /__revyme_disk/assets-delete ← { keys: string[] } */
async function handleAssetDelete(req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await readBody(req, 1024 * 1024);
  if (!body) {
    sendJson(res, 400, { error: 'unreadable body' });
    return;
  }
  let keys: string[];
  try {
    const parsed = JSON.parse(body.toString('utf8'));
    keys = Array.isArray(parsed.keys) ? parsed.keys : [];
  } catch {
    sendJson(res, 400, { error: 'invalid JSON' });
    return;
  }
  const root = projectRoot();
  const dir = path.join(root, 'public', 'assets');
  let deleted = 0;
  for (const key of keys) {
    if (typeof key !== 'string') continue;
    const name = sanitizeAssetName(key.replace(ASSETS_URL_PREFIX, ''));
    try {
      await fsp.unlink(path.join(dir, name));
      deleted++;
    } catch {
      /* not there */
    }
  }
  sendJson(res, 200, { ok: true, deleted });
}

/** PUT /__revyme_disk/website-name ← { name } */
async function handleRename(req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await readBody(req, 64 * 1024);
  if (!body) {
    sendJson(res, 400, { error: 'unreadable body' });
    return;
  }
  try {
    const { name } = JSON.parse(body.toString('utf8'));
    const root = projectRoot();
    const prev = await readManifest(root);
    if (prev) {
      await writeManifest(root, { ...prev, websiteName: String(name ?? '') });
    }
    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 400, { error: 'invalid JSON' });
  }
}

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
  '.txt': 'text/plain',
};

/** POST /__revyme_disk/publish ← { message? } → { sha, branch, committed, actionsUrl }
 *
 * Publish = commit the project directory and push. Deployment itself is the
 *  CI pipeline's job (.github/workflows/deploy-web.yml): pushing main deploys
 *  production, pushing any other branch uploads a preview. The plugin
 *  deliberately holds NO cloud credentials — the only secret-bearing system
 *  is GitHub Actions, so a compromised dev server can at worst make commits,
 *  which are visible, attributable, and revertible. */
async function handlePublish(req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await readBody(req, 64 * 1024);
  let message = '';
  try {
    message = String((JSON.parse(body?.toString('utf8') || '{}') as { message?: string }).message ?? '');
  } catch {
    /* empty body is fine */
  }
  const root = projectRoot();
  const git = (...args: string[]) => execFileP('git', ['-C', root, ...args]);

  try {
    await git('rev-parse', '--show-toplevel');
  } catch {
    sendJson(res, 400, { error: 'project directory is not inside a git repository' });
    return;
  }

  // Stage ONLY the project directory — a publish must never sweep up
  // unrelated monorepo changes sitting in the working tree.
  await git('add', '-A', '--', root);
  const staged = await git('diff', '--cached', '--quiet', '--', root).then(
    () => false,
    () => true,
  );

  let committed = false;
  if (staged) {
    const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const subject = message.trim() ? `Publish: ${message.trim()}` : `Publish: ${stamp}`;
    await git('commit', '-m', subject, '-m', 'Published from the studio.');
    committed = true;
  }

  const { stdout: shaOut } = await git('rev-parse', 'HEAD');
  const { stdout: branchOut } = await git('rev-parse', '--abbrev-ref', 'HEAD');

  try {
    await git('push', 'origin', 'HEAD');
  } catch (err: any) {
    sendJson(res, 502, {
      error: `commit ${committed ? 'created' : 'not needed'}, but push failed: ${String(
        err?.stderr ?? err?.message ?? err,
      ).slice(0, 400)}`,
    });
    return;
  }

  let actionsUrl: string | null = null;
  try {
    const { stdout } = await git('remote', 'get-url', 'origin');
    const m = stdout.trim().match(/github\.com[:/](.+?)(?:\.git)?$/);
    if (m) actionsUrl = `https://github.com/${m[1]}/actions`;
  } catch {
    /* non-github remote — no actions link */
  }

  sendJson(res, 200, {
    sha: shaOut.trim(),
    branch: branchOut.trim(),
    committed,
    actionsUrl,
  });
}

/** GET /__revyme_disk/website-name → { websiteName } (manifest only — never
 *  the full file map; getWebsiteName runs on every boot in parallel with the
 *  real load). */
async function handleGetName(res: ServerResponse): Promise<void> {
  const root = projectRoot();
  const manifest = await readManifest(root);
  sendJson(res, 200, { websiteName: manifest?.websiteName ?? null });
}

/** CSRF/rebinding guard: the API mutates the user's working tree, and simple
 *  cross-origin POSTs (text/plain form posts) reach localhost without a
 *  preflight. Same-origin editor requests carry either no Origin (GET) or an
 *  allowlisted one; anything else is refused. Host pinning blunts DNS
 *  rebinding, where an attacker's hostname resolves to 127.0.0.1. */
const PUBLIC_HOSTS = (process.env.REVYME_PUBLIC_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

function isTrustedRequest(req: Connect.IncomingMessage): boolean {
  const host = String(req.headers.host ?? '');
  const hostOk =
    /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) || PUBLIC_HOSTS.includes(host);
  if (!hostOk) return false;
  const origin = req.headers.origin;
  if (origin === undefined) return true; // same-origin GET / non-browser client
  const o = String(origin);
  if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(o)) return true;
  // Public mode: only the tunnel hostnames, and only over https. Cloudflare
  // Access has already authenticated the request by the time it reaches us —
  // this remains the CSRF layer underneath it.
  return PUBLIC_HOSTS.some((h) => o === `https://${h}`);
}

/** Editor-only API endpoints. */
export function diskProjectApi(): Plugin {
  return {
    name: 'revyme-disk-project-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!url.startsWith(API_PREFIX)) return next();
        if (!isTrustedRequest(req)) {
          sendJson(res, 403, { error: 'untrusted origin or host' });
          return;
        }
        const route = url.slice(API_PREFIX.length);
        const m = req.method ?? 'GET';
        // Reads run freely; every mutation goes through the write mutex so
        // saves, renames, uploads and deletes fully serialize (single editor
        // process — a queued call waits milliseconds, never errors).
        const dispatch: Record<string, (() => Promise<void>) | undefined> = {
          [`GET /project`]: () => handleLoad(res),
          [`GET /website-name`]: () => handleGetName(res),
          [`PUT /project`]: () => withWriteLock(() => handleSave(req, res)),
          [`POST /asset`]: () => withWriteLock(() => handleAssetUpload(req, res)),
          [`POST /assets-delete`]: () => withWriteLock(() => handleAssetDelete(req, res)),
          [`PUT /website-name`]: () => withWriteLock(() => handleRename(req, res)),
          [`POST /publish`]: () => withWriteLock(() => handlePublish(req, res)),
        };
        const handler = dispatch[`${m} ${route}`];
        if (!handler) {
          sendJson(res, 404, { error: 'unknown disk route' });
          return;
        }
        handler().catch((err) => {
          sendJson(res, 500, { error: String(err?.message ?? err) });
        });
      });
    },
  };
}

/** Static /assets/* server — mount on editor, sandbox, and preview alike. */
export function diskProjectAssets(): Plugin {
  return {
    name: 'revyme-disk-project-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (!url.startsWith(ASSETS_URL_PREFIX) || (req.method !== 'GET' && req.method !== 'HEAD')) {
          return next();
        }
        // Resolve the URL path verbatim under <project>/public so nested
        // paths (/assets/img/hero.jpg) match Next's production mapping.
        // safeResolve keeps the traversal / null-byte / absolute guards.
        const rel = decodeURIComponent(url.slice(1));
        const abs = safeResolve(path.join(projectRoot(), 'public'), rel);
        if (!abs) return next();
        fs.stat(abs, (err, stat) => {
          if (err || !stat.isFile()) return next();
          res.statusCode = 200;
          res.setHeader('content-type', MIME[path.extname(abs).toLowerCase()] ?? 'application/octet-stream');
          res.setHeader('content-length', String(stat.size));
          res.setHeader('cache-control', 'no-cache');
          // Scope CORS to local dev origins (vite's default is *): the three
          // dev servers may fetch each other's assets, nothing else should.
          const origin = String(req.headers.origin ?? '');
          if (
            /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ||
            PUBLIC_HOSTS.some((h) => origin === `https://${h}`)
          ) {
            res.setHeader('access-control-allow-origin', origin);
            res.setHeader('vary', 'origin');
          }
          if (req.method === 'HEAD') return res.end();
          fs.createReadStream(abs).pipe(res);
        });
      });
    },
  };
}
