# Upstream tracking — Revyme

This app is a vendored fork of [revyme-web/builder](https://github.com/revyme-web/builder)
(AGPL-3.0), folded into the monorepo. Upstream is a young, fast-moving solo
project with no releases and no documented fork-update path — this file and
`scripts/sync-upstream.sh` are that procedure.

## Pinned version

| | |
|---|---|
| Upstream commit | `2289948e21dbd1cf5ce6b7a9d8f7bc8d7f24fd44` |
| Upstream date | 2026-10-21 |
| Vendored | 2026-10-21 (three-way merge; 101 upstream commits since the previous pin `26b98d68`) |

Update this table every time a sync lands.

## Why this fork exists — the disk backend

Upstream standalone mode persists projects to browser localStorage and stores
assets as base64 data URLs. This fork adds an **on-disk project backend**: the
project IS the monorepo's `apps/web` — a real Next.js app that git tracks,
Claude Code edits, and `next build` deploys. Assets are real files under
`apps/web/public/assets`, served at `/assets/*` by all three dev servers.

Flag: `VITE_DISK_PROJECT` — **defaults ON in this fork** (set `false` to fall
back to upstream localStorage mode). Cloud mode is untouched.

## Local modifications to preserve on sync

`grep -rln "LOCAL FORK" src vite-plugins vite*.config.ts` is the authoritative
list — every fork hunk carries that marker. As of the 2026-10-21 sync:

**Ours (upstream has no such files):** `vite-plugins/{access-gate,ai-openrouter,
ai-service,collab-relay,disk-project,local-api,mcp-bridge}.ts`,
`src/backend/{disk-backend,disk-sync}.ts`, `src/shared/disk-flag.ts`,
`src/local/local-plugin.ts`, `src/canvas/selection/ColorMatchHighlight.tsx`,
`src/editor/tools/selection-colors{,.test}.ts`, `UPSTREAM.md`,
`scripts/sync-upstream.sh`. Plus the fork's own deps in `package.json`
(`@modelcontextprotocol/sdk`, `jose`, `socket.io`, `@hono/node-server`).

**Upstream files we patched (marked hunks):** `src/App.tsx`,
`src/ai/mcp/bridge-client.ts`, `src/ai/vibe-models.ts`, `src/backend/{autosave,
index}.ts`, `src/canvas-sandbox/protocol.ts`, `src/canvas/Canvas.tsx`,
`src/canvas/collab/CollaborationProvider.tsx`, `src/cloud/settings/ConnectAiSection.tsx`,
`src/editor/LayersPanel.tsx`, `src/editor/header/{PreviewOverlay,RightHeader}.tsx`,
`src/editor/left-toolbar/panels/MediaGalleryPanel.tsx`, `src/editor/ui/ImageSearchModal.tsx`,
`vite.config.ts`, `vite.sandbox.config.ts`, `vite.preview.config.ts`.

Retired by the 2026-10-21 sync: our removal of upstream's `VibeComingSoonGate`
(upstream deleted the gate and shipped its agent), our `canExport` disk branch
(upstream now exports the Next.js source in the browser for standalone builds),
and `src/editor/tools/SelectionTool.tsx` edits that upstream absorbed.

## How to sync

```bash
./scripts/sync-upstream.sh            # report: what changed upstream since the pin
./scripts/sync-upstream.sh --merge    # three-way merge in a scratch repo (base = pin, ours, theirs)
```

The script never overlays files onto this directory. It builds the merge in a
scratch repo and prints the conflict list; resolve there (keep every `LOCAL
FORK` hunk; when upstream and the fork both edited a line, prefer upstream and
re-apply the fork's intent), take upstream's lockfile then `npm install` so it
covers the fork's deps, run `tsc --noEmit`, `vitest run` and `npm run build:all`
in the scratch repo, and only then rsync the merged tree back here. Live:
`npm install`, `npm run studio:build` at the monorepo root, `launchctl
kickstart -k gui/$(id -u)/com.teddessert.revyme.studio`, update the pin table.

## Known gaps (deliberate deferrals)

- **Media panel is blind to disk assets**: upstream's standalone media panel
  hides its delete UI and has no asset-list concept; files in
  `apps/web/public/assets` don't appear in it. Manageable via the filesystem
  (which is this fork's whole point) — revisit only if canvas-side asset
  browsing starts to matter.

## Update policy

Deliberate syncs only — upstream commits near-daily. Sync when a release/commit
carries something we want (or a security fix), not on cadence. AGPL note: our
disk backend would be a reasonable upstream PR — offering it back both shrinks
our patch surface and is the licence's spirit.
