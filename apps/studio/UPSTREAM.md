# Upstream tracking — Revyme

This app is a vendored fork of [revyme-web/builder](https://github.com/revyme-web/builder)
(AGPL-3.0), folded into the monorepo. Upstream is a young, fast-moving solo
project with no releases and no documented fork-update path — this file and
`scripts/sync-upstream.sh` are that procedure.

## Pinned version

| | |
|---|---|
| Upstream commit | `26b98d6884817a2b102dcec297cea9c4e4bf9fd0` |
| Upstream date | 2026-08-30 |
| Vendored | 2026-08-30 |

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

**Ours (upstream has no such files — sync must never delete):**

- `vite-plugins/access-gate.ts` — shared-secret gate for public hostnames

- `UPSTREAM.md`, `scripts/sync-upstream.sh`
- `vite-plugins/disk-project.ts` — dev-server endpoints + `/assets/*` static serving
- `src/backend/disk-backend.ts` — `DiskBackend extends LocalBackend`
- `src/shared/disk-flag.ts` — the `DISK_ENABLED` switch

**Upstream files we PATCHED (sync overlays them — re-apply the marked
`// LOCAL FORK` lines after every sync, then diff-review):**

- `src/backend/index.ts` — three-way backend switch (cloud / disk / localStorage)
- `src/backend/autosave.ts` — unload path: keepalive save / leave-dialog for
  the async disk backend (upstream assumes localStorage is synchronous)
- `vite.config.ts` — `diskProjectApi()` + `diskProjectAssets()` in plugins
- `vite.sandbox.config.ts` — `diskProjectAssets()` in plugins
- `vite.preview.config.ts` — `diskProjectAssets()` in plugins
- `src/editor/header/RightHeader.tsx` — Publish button: disk-mode publish
  (flush save → POST /__revyme_disk/publish → commit+push; CI deploys)
- `src/canvas-sandbox/protocol.ts` — `VITE_SANDBOX_ORIGIN` override (tunnel)
- `src/editor/header/PreviewOverlay.tsx` — `VITE_PREVIEW_ORIGIN` override
- `vite.config.ts` / `vite.sandbox.config.ts` / `vite.preview.config.ts` —
  env-driven wss HMR for public hostnames (`REVYME_*_HOST`)

Every patch line carries a `// LOCAL FORK` comment — `grep -rn "LOCAL FORK"`
lists the full surface area of the fork.

## How to sync

```bash
./scripts/sync-upstream.sh            # dry run: what changed upstream since the pin
./scripts/sync-upstream.sh --apply    # overlay upstream, keeping our added files
```

After `--apply`: re-apply the four patches above (grep for missing `LOCAL FORK`
markers), `npm ci`, boot, drag something, confirm it lands in `apps/web`, update
the pin table.

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
