# Portfolio

A monorepo for Ted Dessert's portfolio site and the experiments that sit alongside it.

## Layout

```
apps/
  site/          Ted Dessert — Product Designer. React 19 + TypeScript.
  experiments/   Typography and layout experiments. Vanilla JS, multi-page.
  studio/        Revyme (vendored fork) — the visual canvas that edits apps/web.
  web/           THE PORTFOLIO — a real Next.js app; the studio's live document.
```

Both are Vite apps sharing one npm workspace, one lockfile, and one `node_modules`.

## Running

```bash
npm install
```

| command | what it runs | port |
|---|---|---|
| `npm run dev` | the site (default) | 5173 |
| `npm run dev:site` | the site | 5173 |
| `npm run dev:experiments` | the experiments | 5174 |
| `npm run dev:studio` | the Revyme studio (edits `apps/web` on disk) | 3333 (+5174/5175 sandboxes) |
| `npm run build:web` | production build of the portfolio | — |

The ports are pinned separately so both can run at the same time. `npm run build` builds every workspace; `npm run build:site` / `npm run build:experiments` build one.

## apps/site

The portfolio itself. React 19, TypeScript, `@astryxdesign/core`, Geist, lucide-react. Unchanged by the monorepo move apart from its location — `git mv` kept its history.

## apps/experiments

A small gallery of typography experiments, each its own page:

- **Variable type tester** (`type-tester.html`) — a specimen tool for the MaaS Index and Interface variable typefaces. Every control is generated from the font binaries themselves: axes and named instances from `fvar`, features from `GSUB`, the glyph inventory from `cmap`. Includes a spacing-grid analyser that measures live advance widths, and a proximity view that drives per-character weight from the pointer.
- **The flow** (`flow.html`) — a magazine spread that re-typesets itself using [Pretext](https://github.com/chenglou/pretext) for line breaking, [LayoutSans](https://github.com/BaselAshraf81/layout-sans) for column geometry, and [Justif](https://github.com/lyallcooper/justif) for Knuth–Plass justification. Lays out a full article across a horizontally scrollable rail of columns without ever reading layout from the DOM — there is a live counter proving it.

See [apps/experiments/README.md](apps/experiments/README.md) for the detail, including the measurement gotchas that produced wrong numbers before they were handled.

### Fonts

Web fonts are committed under `apps/experiments/public/fonts/` with their licences. To re-sync them from the upstream repositories:

```bash
npm run fonts
```

That clones the source repos into a gitignored `.fonts-src/` cache, extracts the variable `woff2` files, and regenerates `src/font-data.json` — the axis, feature and glyph data the tester's UI is built from.

## apps/studio + apps/web — the design system

The centrepiece. `apps/studio` is a vendored fork of
[Revyme](https://github.com/revyme-web/builder) (AGPL-3.0) — a Framer-class visual
canvas whose document format is real Next.js source. Our fork adds a **disk backend**
(see [apps/studio/UPSTREAM.md](apps/studio/UPSTREAM.md)): instead of localStorage, the
canvas reads and writes `apps/web` directly through the dev server.

So `apps/web` is simultaneously:

- the studio's live document — drag something on the canvas and the `.tsx` changes;
- an ordinary Next.js app — edit the files by hand or with Claude Code and the canvas
  renders the change on reload;
- the deploy artifact — `npm run build:web` → `next build`; Cloudflare Workers via
  `npm --prefix apps/web run deploy:cf` (OpenNext adapter, `wrangler.jsonc` committed).

Assets are real files in `apps/web/public/assets`, served at `/assets/*` in the canvas,
the preview, and production alike. `apps/web/.revyme/manifest.json` records which files
the canvas manages — everything else in `apps/web` (package.json, wrangler config,
public assets) survives every save untouched. Neither app is an npm workspace: each
keeps its own lockfile.

## Notes

- Both apps are on Vite 8, so the toolchain is installed once at the root rather than duplicated per app.
- Nothing here is wired for deployment yet; it is local dev only.
