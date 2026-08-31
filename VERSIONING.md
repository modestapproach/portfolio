# Versioning architecture

Opinionated decisions for how this system — the studio fork, and the sites built
inside it — is versioned, saved, synced, and published. Written 2026-08-31.

## The core decision: git IS the versioning system. Do not build another one.

Webflow and Framer run bespoke versioning engines because they have no choice:
their document is rows in their database, so they must reinvent snapshots,
diffs, restore, and staging from scratch — and sell them back as features.
Framer's version history decays (5-minute snapshots for 4 hours, hourly for a
day, daily after that), staging requires a paid custom domain, and branching
only shipped in mid-2026.

Our document format is **source code in a directory**. That was the decisive
architecture choice, and it means the best-engineered versioning system ever
built is already installed. Building a parallel snapshot system would be
adopting the incumbent's weakness while throwing away our structural advantage.
Every feature they engineered is a git primitive here:

| Webflow/Framer feature | Ours |
|---|---|
| Version history | `git log` — full fidelity forever, no decay |
| Restore | `git restore` / `git revert` |
| Staging | a branch + its preview deploy |
| Branching (Framer, 2026) | `git branch`, since 1970-something |
| Publish | deploy a SHA |
| Rollback of live site | redeploy any prior SHA / `wrangler rollback` |

## Why rollback can't break the CMS here

Webflow rollbacks are dangerous because design versions and CMS content live in
**separate systems** — restoring one desynchronizes references into the other.
In Revyme's dialect, pages, components, CMS collections, i18n messages, and
assets are all files in **one tree**, so every commit is an atomic snapshot of
all of them together. Rolling back moves design AND content AND asset
references as a unit. Referential breakage is prevented by construction, not by
cleverness. And in the worst imaginable tangle, the repair tool is `git diff` —
the one format AI is best in the world at reasoning about.

The honest tradeoff: content edits and design edits share one history. When
"edit the text without touching design history" starts to matter, scope commits
by path (`cms/` vs everything else) — commits are per-file; no new machinery.

## Two tiers of history (because autosave ≠ commit)

Canvas work autosaves every 2 seconds; nobody wants 2-second commits. So:

1. **Checkpoints (automatic, fine-grained).** The disk plugin (which already
   sees every save and hashes every file) auto-commits to a dedicated ref
   (`refs/revyme/checkpoints`), debounced to every ~2 minutes of actual change.
   This is Framer's 5-minute snapshot tier — except it never decays, works
   offline, and costs nothing. Crash recovery and "undo past the undo stack"
   live here.
2. **Versions (deliberate, named).** Ordinary commits on the working branch,
   made at meaningful moments — by hand, by asking the AI, or later by the
   studio's Publish button (the disk plugin can expose a commit endpoint the
   editor calls). These are the history you actually read.

Status: tier 2 works today (it's just git). Tier 1 is the next build item in
the disk plugin.

## Where versioning data lives

Three layers, each using its platform's native versioning — no invented sync:

1. **Local git** — the working truth. Checkpoints + commits.
2. **GitHub** — durability and multi-computer sync. Checkpoints auto-push in
   the background (laptop dies → lose at most ~2 minutes). This answers "should
   sites always save to the cloud" without adopting a server.
3. **Cloudflare** — immutable deploy artifacts only, one per published SHA.
   Rolling back the LIVE site = redeploying a prior SHA (or `wrangler
   rollback`) and never touches the working tree. Never the source of truth.

## Local-first, cloud-synced — not cloud-first

Develop locally. The entire value of this fork over Revyme Cloud is that the
project is local files: Claude Code edits them directly, the canvas has zero
latency, everything works offline, and there is no server to run, patch, or
lose. The one real argument for cloud-first is durability — solved above by
auto-pushing checkpoints. The one thing genuinely lost is real-time
multiplayer, which a solo portfolio does not need; if it ever does, that's what
Revyme Cloud is for.

**Publish = `git push`.** A GitHub Action on `main` runs the OpenNext build and
`wrangler deploy`. From any computer: push, and the site is live. No manual
routing, no export step, no "AI please wire the deploy" — the Publish button in
the studio can later trigger the same path (commit + push via the disk plugin).

## Tool vs. project versioning — keep them decoupled

- **The tool** (`apps/studio`): vendored fork, pinned in `UPSTREAM.md`, synced
  deliberately via `scripts/sync-upstream.sh`. Its history is the monorepo's.
- **The projects** (`apps/web`): same monorepo today (right for one site; a
  future client site gets its own repo + the same plugin pointed at it via
  `REVYME_PROJECT_DIR`).
- **The rule that keeps them decoupled:** a studio upgrade must never silently
  rewrite project files. If an upstream sync changes the generated-code
  dialect, the re-save of the project is its own commit, labeled as such — so
  history always distinguishes "the tool changed" from "the design changed."

## What this unlocks that Framer users are still asking for

Grounded against current complaints and Framer's own docs:

- **Code ownership** — Framer's #1 structural complaint: no code export at all,
  by business decision; sites exist only on their servers and need their
  runtime. Ours *is* a Next.js repo; there is nothing to export.
- **History that doesn't decay** — their snapshots thin out after hours/days;
  git keeps everything forever, per-file (`git log -p components/VariableName.tsx`).
- **Free staging & branching** — theirs gates staging behind a paid custom
  domain and shipped branching in June 2026; ours is branches + per-branch
  preview deploys, with **design PRs** an AI can review (`/code-review` works
  on canvas output — nobody else can say that).
- **No platform ceilings** — their CMS caps at 1,000 items, no auth, no
  backend, no JSON-LD/structured data, no hreflang. Ours is Next.js: any of
  that is a normal feature, and the Code-component pattern (see
  `components/VariableName.tsx`) is the escape hatch inside the canvas.
- **CI on design** — every push can run build + Lighthouse + a11y audits.
  Design regressions caught like code regressions.
- **Reproducible forever** — a Framer site dies with Framer. This repo builds
  in ten years.

## Build order

1. **Checkpoints** in the disk plugin (auto-commit ref + debounce + background
   push). Highest value per line of code.
2. **Deploy workflow** (GitHub Action: push → build:cf → wrangler deploy) —
   makes "publish = push" real. Needs `wrangler login` secrets in repo config.
3. **Publish button wiring** (plugin endpoint: commit + push) — nice-to-have
   glue once 1–2 are boring.
4. **Versions panel** in-canvas (list checkpoints, one-click restore through
   the existing conflict guard) — only if git-via-AI ever feels like friction.
