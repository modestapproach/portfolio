// disk-sync.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The tab's relationship to the disk under live sync:
//   · `baseSavedAt` — the manifest timestamp this tab is known to be in
//     sync with. Set on load, on every successful save, and on every
//     file-sync the relay persists (ours or a peer's). Every full-snapshot
//     save sends it; the server refuses a save whose base is behind the
//     disk, which is what stops a tab that missed edits from putting its
//     old copy back (the manifest-hash check cannot see that case).
//   · `catchUpFromDisk()` — bring memory up to the disk. Used after a
//     (re)connect, and after a stale-save refusal. The relay keeps no
//     history, so the disk IS the history: any file that differs is taken
//     from disk. Files this tab holds that the disk lacks are left alone
//     (never delete on catch-up). Applied as remote writes so the collab
//     broadcast hook stays quiet.

import { getDefaultStore } from 'jotai';
import { toast } from 'sonner';
import { projectFS, projectVersionAtom } from '@/code/project/project-fs';
import { syncQueueCode } from '@/code/mutation/mutation-queue';
import { activeFilePathAtom } from '@/code/project/active-file-store';
import { forceCanvasRender } from '@/canvas/node-ops';
import { trace } from '@/shared/debug-trace';

const API = '/__revyme_disk';

/** A stable per-TAB identity — there are no accounts in disk mode. The
 *  relay's unit is the tab (one socket, one save leader, one echo to
 *  suppress), so two tabs in one browser must NOT share an id: with a
 *  browser-wide id the fan-out of one tab's save skipped the other as "the
 *  saver" and both tabs elected themselves leader. sessionStorage is per
 *  tab and survives reload, so a tab keeps its color. Names the device
 *  well enough to tell the mini from the laptop in a cursor label. Sent on
 *  the relay join AND as a header on every save. */
export function deviceIdentity(): { id: string; name: string } {
  const KEY = 'revyme_tab_id';
  let id = '';
  try { id = sessionStorage.getItem(KEY) ?? ''; } catch { /* private mode */ }
  if (!id) {
    id = Math.random().toString(36).slice(2, 10);
    try { sessionStorage.setItem(KEY, id); } catch { /* ignore */ }
  }
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || navigator.platform || 'device';
  return { id, name: `${platform} · ${id.slice(0, 4)}` };
}

let baseSavedAt: string | null = null;

export function getBaseSavedAt(): string | null {
  return baseSavedAt;
}

/** Advance the sync base. Monotonic: an out-of-order broadcast can never
 *  move it backwards. */
export function noteSavedAt(savedAt: string | null | undefined): void {
  if (!savedAt) return;
  if (baseSavedAt === null || savedAt > baseSavedAt) baseSavedAt = savedAt;
}

let inFlight: Promise<number> | null = null;

/** Resolves to the number of files taken from disk. Coalesces concurrent
 *  callers (a reconnect and a stale-save refusal can land together). */
export function catchUpFromDisk(): Promise<number> {
  if (inFlight) return inFlight;
  inFlight = run().finally(() => { inFlight = null; });
  return inFlight;
}

async function run(): Promise<number> {
  let files: Record<string, string> | null = null;
  let savedAt: string | null = null;
  try {
    const res = await fetch(`${API}/project`, { cache: 'no-store' });
    if (!res.ok) return 0;
    const data = (await res.json()) as { files?: Record<string, string>; savedAt?: string | null };
    files = data?.files ?? null;
    savedAt = data?.savedAt ?? null;
  } catch (err) {
    trace.error('disk-sync:fetch-error', { error: String(err) });
    return 0;
  }
  if (!files) return 0;

  const changed: string[] = [];
  for (const [path, content] of Object.entries(files)) {
    if (projectFS.readFile(path) === content) continue;
    projectFS.applyRemoteWrite(path, content);
    changed.push(path);
  }
  noteSavedAt(savedAt);
  if (changed.length === 0) {
    trace.action('disk-sync:catch-up', { changed: 0 });
    return 0;
  }
  const store = getDefaultStore();
  store.set(projectVersionAtom, (v: number) => v + 1);
  const activeFile = store.get(activeFilePathAtom);
  if (changed.includes(activeFile)) syncQueueCode(files[activeFile]);
  forceCanvasRender();
  trace.action('disk-sync:catch-up', { changed: changed.length, files: changed.slice(0, 8) });
  toast(`Caught up with ${changed.length} file${changed.length === 1 ? '' : 's'} edited elsewhere.`, {
    id: 'collab-catch-up',
    duration: 4000,
  });
  return changed.length;
}
