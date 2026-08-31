# Experiments

Two typography experiments sharing one shell. `/` lists them; each has a back button to return.

| | | |
|---|---|---|
| **01** | [Variable type tester](type-tester.html) | Play with the Index and Interface variable typefaces |
| **02** | [The flow](flow.html) | A magazine spread that re-typesets itself, using Pretext + LayoutSans |

```bash
npm install
npm run dev
```

Vite serves all three pages (`index.html`, `type-tester.html`, `flow.html`); `vite.config.js` lists them as build inputs. Shared chrome, tokens, `@font-face` rules and the colour palettes live in `src/shell.css` and `src/palettes.js`.

---

# 02 · The flow

A magazine spread where **every vertical dimension is predicted rather than measured**, set in **Junicode**. Three libraries, one division of labour:

| | job |
|---|---|
| **[Pretext](https://github.com/chenglou/pretext)** | how tall is this text, and how much of it fits in each column |
| **[LayoutSans](https://github.com/BaselAshraf81/layout-sans)** | where every box goes — including the rail, which is wider than the page |
| **[Justif](https://github.com/lyallcooper/justif)** | where the lines break inside a column, and how the spaces are distributed |

The claim is instrumented, not asserted: `getBoundingClientRect` is wrapped in a counter on both `Element.prototype` and `Range.prototype`, so **layout reads while typesetting** is a real measurement. It reads `0`.

## Readability drives the layout

The column width is not a number anyone typed. You set a **target average line length in characters**, and the page binary-searches the width that produces it.

Average characters per line is just total characters over line count, so the whole control reduces to finding the width whose line count is `TOTAL_CHARS / target`. Each probe is one `measureLineStats` call — arithmetic over cached widths, no DOM — so a 23-probe search costs nothing. Measured:

| target | actual | width | columns | loosest lines on screen |
|---|---|---|---|---|
| 32 | 32.2 | 229px | 13 | +32%, +44%, **+87%** |
| 45 | 45.2 | 317px | 9 | +48%, +15%, +46% |
| **66** | **65.1** | 449px | 7 | **+7%, +18%, +19%** |
| 85 | 84.8 | 586px | 5 | +19%, +34%, +7% |
| 100 | 96.6 | 668px | 5 | +29%, +27%, +8% |

That is the classic "65 characters" advice, arrived at empirically: around 66 the spacing is tightest, and below 40 a line holds too few word spaces to absorb its slack. The target cannot always be hit exactly because line count is an integer — at 100 the nearest achievable average is 96.6.

## The rail

The article is laid out in full, as **as many columns as it needs**, on a LayoutSans rail that is deliberately wider than the page. The strip is the window onto it.

Navigation sits in its own row of the LayoutSans frame at the foot of the paper — `‹` / `›`, a clickable segment track showing every column with the current one filled, and a count. Being a real row rather than an overlay, it never sits on top of the text and it cannot be cropped out by a crowded header. Arrow keys and horizontal trackpad scrolling work too.

Scrolling is a `transform` on the rail, so nothing re-lays-out — the columns that come into view were typeset before you asked for them.

The motion is a sampled damped spring (ζ = 0.75, ω = 8) emitted as a CSS `linear()` timing function: **2.9% overshoot, settled in 0.85s** — a soft landing rather than a bounce. A `cubic-bezier` stands in for engines without `linear()`, and `prefers-reduced-motion` drops the transition entirely.

Note that scrolling deliberately does **not** call `render()`. A freshly created element with an inline transform has no previous value to animate from, so rebuilding the DOM on every scroll meant the transition never played at all — the columns simply teleported. Moving the existing rail is what makes the spring visible, and it also skips re-typesetting and re-running Justif (~150 layout reads) on every step.

## Typeface

Three faces, switchable, and every calculation follows. Because the measure solver works from line counts rather than any assumed character width, it adapts to a proportional or monospaced face without changing a line of code. Solving the same 31.8-character target:

| face | axes | solved width |
|---|---|---|
| Junicode | `wght` 300–700, `wdth` 75–125 | 229px |
| Index | `wght` 100–700 | 341px |
| Interface | `wght` 100–900 (`opsz` pinned) | 278px |

Only Junicode has a `wdth` axis, so it is the only face where Justif's font expansion does anything; the panel says so when you pick one of the others. Interface's `opsz` axis stays pinned at its default, because optical sizing lives outside the canvas font shorthand — the same reason neither library will look at `font-variation-settings`.

## Justification — three settings, measured

- **Ragged** — Pretext's greedy first-fit breaks rendered verbatim as hard lines. Predicted height matches measured to ~0.08px.
- **Native** — `text-align: justify`; the browser justifies one line at a time.
- **Justif** — Knuth–Plass over the whole column, TeX hyphenation, hanging punctuation, and glyph expansion along the `wdth` axis.

The **Word spacing** panel makes the comparison objective. It ranges over every rendered space character and reports how much the loosest line is stretched past the font's natural space, plus the spread between loosest and tightest line in that column. On identical column widths, Justif was roughly **7× better on the worst line** than native justification.

**Hanging punctuation** is exposed as a control (`none` / line ends / line ends + first line start / all line edges). It maps to Justif's `hangingPunctuation` option. You can verify it does real work: switching `none` → `all-line-edges` changes exactly the line segments that end in punctuation, deepening their end margin from `-1.179px` to `-4.318px` as the period hangs further out.

**Why Junicode.** Justif's font-expansion — condensing and expanding the glyphs themselves to even out colour instead of dumping slack into word spaces — needs a variable font with a `wdth` axis. Junicode has `wght` 300–700 and `wdth` 75–125, so the lever is live. It was inert under Index, which has only `wght`. The `@font-face` rule must declare `font-stretch: 75% 125%` or the browser will not accept Justif's per-line `font-stretch`.

**Fit column** snaps size and leading so whole lines exactly fill the column height: 630 candidate layouts in 77 ms with **0 layout reads**, leaving 0.5px at the foot instead of a dangling half line.

## Things worth knowing if you extend it

- Pretext measures through the canvas font shorthand, which carries weight but **not** `font-feature-settings` or `font-variation-settings`. Everything on the paper uses `font-weight` so CSS and both libraries agree.
- Justif enforces the same rule and *refuses* rather than guessing: it declines any run whose computed `font-variation-settings` is not `normal`. `shell.css` sets it on `<body>` for the UI font, it inherits into the paper, and Justif silently declined every column until `.page` reset it to `normal`. Wire up `onSkip` before assuming it ran.
- LayoutSans's `padding` is a **number**, not a `{top,right,bottom,left}` object. Passing an object yields `NaN` widths that propagate silently instead of throwing.
- Justif is not free the way Pretext is: ~7–60 ms and 60–200 layout reads depending on column count, against Pretext's 0. It measures via canvas too, but its DOM write-back genuinely reads layout. A bounded one-time pass, not a per-frame cost.

---

# 01 · Variable type tester — Index & Interface

A playground for the two Magic as a Service variable typefaces:

- **[Index](https://github.com/magicasaservice/index)** — variable duospace typewriter face (IBM Plex / iA Writer Duo lineage). `wght` 100–700, roman + italic, 747 glyphs.
- **[Interface](https://github.com/magicasaservice/interface)** — grotesque UI face in the Inter/Haas lineage. `opsz` 14–32 + `wght` 100–900, roman + italic, ~2860 glyphs.

Every control in the app is generated from the fonts themselves — axes, named instances, OpenType feature tags and the glyph inventory are read straight out of the `fvar`, `GSUB`/`GPOS` and `cmap` tables, so nothing is hand-typed and nothing drifts when the fonts are updated upstream.

```bash
npm install
npm run dev
```

## What you can drive

**Variable axes** — one slider per real axis, ranges taken from `fvar`. Weight also gets named-instance chips (Text Thin … Display Black), plus an *Animate weight* toggle that sweeps the axis. For Interface, *track optical size to font size* links `opsz` to the size slider the way `font-optical-sizing: auto` would, but you can also break the link and hold a Display drawing at 14px.

**Layout** — size (8–480px), line height, letter spacing, alignment, case.

**OpenType features** — every tag present in the font, grouped (ligatures, caps & case, figures, stylistic sets, character variants, other). Features browsers apply by default (`liga`, `calt`, `kern`, `ccmp`, …) start on and emit `"tag" 0` when you switch them off; the rest emit `"tag" 1` when on. Interface exposes ss01–ss08 and cv01–cv15; Index has ss01 and cv01–cv03.

**Views**
- *Type* — editable specimen, type straight into it.
- *Waterfall* — one line at ten sizes, 160px down to 11px.
- *Weights* — the named instances at the current optical size, stacked.
- *Grid* — spacing analysis, see below.
- *Proximity* — pointer-driven weight gradient, see below.
- *Glyphs* — the full cmap; click any cell to append it to the specimen.

## The Proximity view

Every character is its own element carrying its own `wght`. On each frame the distance from the pointer to each glyph's centre is measured and run through a falloff curve, so the letter nearest the cursor hits the peak weight and its neighbours decay away from it. The field is 2D — on multi-line text the line below thickens too.

Controls: **radius** (how far the field reaches), **peak weight**, **smoothing** (0 snaps instantly, high values trail behind the cursor), and the falloff curve — Gaussian, Smooth (raised cosine), Linear, or Spike. The main weight slider sets the *resting* weight, so dragging peak *below* it inverts the effect and letters thin out under the cursor. Click anywhere to pin the field in place.

Aim is exact — pointing at character *n* peaks character *n*, decaying symmetrically:

```
aim at index 7   400,401,406,427,484,564,650,700,650,546,471,419,403,400,400,400,400
```

Two things worth knowing if you modify it:

- Glyph positions are re-read every frame rather than cached at rest. Caching is cheaper, but letters shift as they thicken, and the field then peaks one to two characters away from the pointer — measurably so. All reads are batched before any write, so it costs one forced layout per frame.
- Peak weight is clamped to the current face's axis. Carry a peak of 900 over from Interface and Index correctly caps it at 700.

Index suits this effect particularly well: because it is duospace, thickening barely reflows the line, so the letters swell in place instead of shoving each other sideways.

## The Grid view

Index looks monospaced but isn't quite — it is *duospace*. This view measures the live advance width of every printable ASCII glyph at the current axis and feature settings, finds the modal advance, and rules the specimen against it.

At wght 450, Index reports **89 of 94 letterforms on a 0.6em cell (95%)**, with `@ M W m w` drawn at exactly 1.5×. That is the duospace idea working as designed — `m` and `w` get the room they need instead of being cramped into a uniform box. Interface, by contrast, sits at 5% on the modal cell with advances running from 0.242em to 0.985em: plainly proportional.

The word space is scored separately from the letterforms, because a face can put every letter on one advance while still spacing words narrower — which is exactly what Index does.

### The monospace switch

Index ships a real one. `ss01` contains exactly 16 substitutions, every one of them narrowing a 0.9em glyph to the 0.6em cell — `@ M W m w`, the accented `Ẃ Ŵ Ẅ Ẁ ẃ ŵ ẅ ẁ`, and the `æ œ` ligatures. The alternates are named `m.ss01`, `w.ss01` and so on. Turn it on and the face reads 94 of 94 letterforms on one advance, 100%:

```css
font-feature-settings: "ss01" 1;
```

`aalt` reaches the same alternates, but as collateral — it swaps every glyph for its first alternate, so `a` becomes `ª` and `o` becomes `º` along the way. It is not the switch.

The **Monospace** toggle in the panel is not hardcoded to Index or to `ss01`. `scripts/sync-fonts.mjs` parses GSUB, applies each feature's substitutions to the ASCII set, and keeps any feature that raises the share of glyphs on the modal advance above 98% — preferring the most targeted one, and ignoring `aalt` by name. Interface reports no such feature, correctly.

One caveat the view calls out: Index's word space is 800/2048 = **0.391em**, against a 0.6em letter cell. Even with `ss01` on, text containing spaces will not hold a column grid — it is monospaced per letterform, not per character position.

*Force every glyph into one cell* switches between the two readings — unforced, glyphs keep their real advance and you watch them drift off the rules; forced, each is centred in one cell, which is what the face would look like if it were strictly monospaced.

Two measurement details worth knowing, since both produced wrong numbers before they were handled:

- Advances are measured after `document.fonts.ready`, and the readiness flag is part of the measurement cache key. Probing during the `font-display: block` window returns *fallback* metrics, which made Index read as "proportional, 28%".
- Each glyph is probed in its own block-level, `max-content` box. Left as adjacent inline spans, Chrome shapes across the element boundaries, so in Interface the sequence `<` `=` `>` ligated into a single arrow — `<` absorbed the whole 1.34em advance and the other two measured zero.

**Colour** — text/background pickers, preset pairs, swap.

**Output** — the CSS panel shows the live `@font-face` plus the exact `font-variation-settings` / `font-feature-settings` rule. *Copy link* puts the entire state in the URL hash, so a setting you like is shareable and reloadable.

## Updating the fonts

```bash
npm run fonts
```

`scripts/sync-fonts.mjs` clones (or pulls) both repos into `.fonts-src/`, copies the `.woff2` files into `public/fonts/`, and regenerates `src/font-data.json` by parsing the `.ttf` binaries. No font tooling required — the sfnt reader is in that one script.

## Licences

Index is under the SIL Open Font License 1.1 with the reserved font name "Index"; Interface is MIT. Both licence files are copied into `public/fonts/` by the sync script.
