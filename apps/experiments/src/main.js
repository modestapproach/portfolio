import './shell.css'
import './style.css'
import fontData from './font-data.json'
import { PALETTES } from './palettes.js'

/* ------------------------------------------------------------------ data */

const FAMILIES = fontData.families
const byId = Object.fromEntries(FAMILIES.map((f) => [f.id, f]))

/** Features browsers already apply unless you switch them off. */
const ON_BY_DEFAULT = new Set(['ccmp', 'locl', 'mark', 'mkmk', 'calt', 'clig', 'liga', 'kern', 'rlig', 'rvrn'])

/** Features that only do something to already-marked-up text — hidden by default. */
const FEATURE_LABELS = {
  aalt: 'All alternates',
  c2sc: 'Small caps from capitals',
  calt: 'Contextual alternates',
  case: 'Case-sensitive forms',
  ccmp: 'Glyph composition',
  cpsp: 'Capital spacing',
  dlig: 'Discretionary ligatures',
  dnom: 'Denominators',
  frac: 'Fractions',
  kern: 'Kerning',
  liga: 'Standard ligatures',
  locl: 'Localised forms',
  mark: 'Mark positioning',
  mkmk: 'Mark-to-mark positioning',
  numr: 'Numerators',
  onum: 'Oldstyle figures',
  ordn: 'Ordinals',
  pnum: 'Proportional figures',
  rlig: 'Required ligatures',
  salt: 'Stylistic alternates',
  sinf: 'Scientific inferiors',
  smcp: 'Small capitals',
  subs: 'Subscript',
  sups: 'Superscript',
  tnum: 'Tabular figures',
  zero: 'Slashed zero',
}

const FEATURE_GROUPS = [
  { name: 'Ligatures', match: (t) => ['liga', 'dlig', 'calt', 'clig', 'rlig'].includes(t) },
  { name: 'Caps & case', match: (t) => ['smcp', 'c2sc', 'case', 'cpsp'].includes(t) },
  {
    name: 'Figures',
    match: (t) =>
      ['tnum', 'pnum', 'onum', 'lnum', 'zero', 'frac', 'numr', 'dnom', 'ordn', 'sups', 'subs', 'sinf'].includes(t),
  },
  { name: 'Stylistic sets', match: (t) => /^ss\d\d$/.test(t) },
  { name: 'Character variants', match: (t) => /^cv\d\d$/.test(t) },
  { name: 'Other', match: () => true },
]

const featureLabel = (tag) => {
  const mono = current().monoFeature
  if (mono && tag === mono.tag) return `Monospace ${mono.chars.join(' ')}`
  if (FEATURE_LABELS[tag]) return FEATURE_LABELS[tag]
  if (/^ss\d\d$/.test(tag)) return `Stylistic set ${+tag.slice(2)}`
  if (/^cv\d\d$/.test(tag)) return `Character variant ${+tag.slice(2)}`
  return tag
}

const PRESETS = {
  common: [
    ['Pangram', 'Brick quiz whangs jumpy veldt fox'],
    ['Word', 'Brick'],
    [
      'Alphabet',
      'ABCDEFGHIJKLM\nNOPQRSTUVWXYZ\nabcdefghijklm\nnopqrstuvwxyz\n0123456789',
    ],
    [
      'Paragraph',
      'A variable font is one file that contains a continuous range of styles. Instead of shipping twenty static weights, the designer draws the extremes and lets the interpolation fill in everything between — so a headline can sit at 623 and a caption at 412, and both come from the same 300 kilobytes.',
    ],
    ['Figures', '0123456789 · 0O 1lI 8B 5S 2Z\n1/2 3/4 ½ ¼ №1 ×÷±≈≠≤≥\n$1,204.50 €98 £77 ¥13'],
    ['Punctuation', '! ? & @ # % * © ® ™ § ¶ † ‡\n“quotes” ‘single’ — – ‑ … ·\n( ) [ ] { } / \\ | < > ~ ^'],
  ],
  index: [
    [
      'Code',
      'const brick = (w = 450) => ({\n  wght: w,\n  slnt: 0,\n  toString() { return "Index " + w }\n})\n\n// il1 O0 => != >= <= --- ***',
    ],
    ['Mono check', 'iiiiiiiiii\nmmmmmmmmmm\nWWWWWWWWWW\n0123456789\n||||||||||'],
  ],
  interface: [
    ['UI copy', 'Continue\nSettings\nDelete account\n12 unread · 4 drafts'],
    ['Optical', 'Text at 14\nDisplay at 32\nSame family, different drawing'],
  ],
}

/* ----------------------------------------------------------------- state */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const round = (v, p = 0) => Number(v.toFixed(p))

function defaultAxes(family, style) {
  const out = {}
  for (const a of byId[family].styles[style].axes) {
    // fvar's own default for `wght` is the family's lightest master here, which
    // makes for a hairline first impression — start at book weight instead.
    out[a.tag] = a.tag === 'wght' ? clamp(400, a.min, a.max) : a.default
  }
  return out
}

function defaultFeatures(family, style) {
  const out = {}
  for (const t of byId[family].styles[style].features) out[t] = ON_BY_DEFAULT.has(t)
  return out
}

const state = {
  family: 'interface',
  style: 'upright',
  view: 'type',
  axes: {},
  features: {},
  size: 120,
  lh: 1,
  tracking: 0,
  align: 'left',
  transform: 'none',
  bg: PALETTES[0][0],
  fg: PALETTES[0][1],
  autoOpsz: false,
  snap: false,
  hoverRadius: 220,
  hoverPeak: null, // resolved to the weight axis maximum on first use
  hoverFalloff: 'gauss',
  hoverSmooth: 0.72,
  text: PRESETS.common[0][1],
}
Object.assign(state, { axes: defaultAxes('interface', 'upright'), features: defaultFeatures('interface', 'upright') })

const current = () => byId[state.family].styles[state.style]

/* ---------------------------------------------------------- url encoding */

function saveHash() {
  const payload = {
    f: state.family,
    s: state.style,
    v: state.view,
    a: state.axes,
    o: Object.entries(state.features)
      .filter(([t, on]) => on !== ON_BY_DEFAULT.has(t))
      .map(([t]) => t),
    z: state.size,
    l: state.lh,
    t: state.tracking,
    al: state.align,
    tr: state.transform,
    bg: state.bg,
    fg: state.fg,
    ao: state.autoOpsz ? 1 : 0,
    sn: state.snap ? 1 : 0,
    hr: state.hoverRadius,
    hp: state.hoverPeak,
    hf: state.hoverFalloff,
    hs: state.hoverSmooth,
    x: state.text,
  }
  history.replaceState(null, '', '#' + encodeURIComponent(JSON.stringify(payload)))
}

function loadHash() {
  if (!location.hash.length) return
  let p
  try {
    p = JSON.parse(decodeURIComponent(location.hash.slice(1)))
  } catch {
    return
  }
  if (p.f && byId[p.f]) state.family = p.f
  if (p.s && byId[state.family].styles[p.s]) state.style = p.s
  state.axes = defaultAxes(state.family, state.style)
  state.features = defaultFeatures(state.family, state.style)
  if (['type', 'waterfall', 'ramp', 'grid', 'proximity', 'glyphs'].includes(p.v)) state.view = p.v
  for (const a of current().axes) {
    if (typeof p.a?.[a.tag] === 'number') state.axes[a.tag] = clamp(p.a[a.tag], a.min, a.max)
  }
  for (const t of p.o || []) {
    if (t in state.features) state.features[t] = !ON_BY_DEFAULT.has(t)
  }
  if (typeof p.z === 'number') state.size = clamp(p.z, 8, 480)
  if (typeof p.l === 'number') state.lh = clamp(p.l, 0.6, 3)
  if (typeof p.t === 'number') state.tracking = clamp(p.t, -0.12, 0.6)
  if (p.al) state.align = p.al
  if (p.tr) state.transform = p.tr
  if (/^#[0-9a-f]{6}$/i.test(p.bg || '')) state.bg = p.bg
  if (/^#[0-9a-f]{6}$/i.test(p.fg || '')) state.fg = p.fg
  state.autoOpsz = !!p.ao
  state.snap = !!p.sn
  if (typeof p.hr === 'number') state.hoverRadius = clamp(p.hr, 30, 1200)
  if (typeof p.hp === 'number') state.hoverPeak = p.hp
  if (FALLOFFS[p.hf]) state.hoverFalloff = p.hf
  if (typeof p.hs === 'number') state.hoverSmooth = clamp(p.hs, 0, 0.95)
  if (typeof p.x === 'string') state.text = p.x
}

/* ------------------------------------------------------------ font faces */

/* ------------------------------------------------------ derived css bits */

function fvs(overrides = {}) {
  const merged = { ...state.axes, ...overrides }
  return (
    current()
      .axes.map((a) => `"${a.tag}" ${round(merged[a.tag], 2)}`)
      .join(', ') || 'normal'
  )
}

function ffs() {
  const parts = Object.entries(state.features)
    .filter(([t, on]) => on !== ON_BY_DEFAULT.has(t))
    .map(([t, on]) => `"${t}" ${on ? 1 : 0}`)
  return parts.length ? parts.join(', ') : 'normal'
}

const trackingCss = () => `${round(state.tracking, 3)}em`

/* --------------------------------------------------------------- helpers */

const h = (html) => {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild
}
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

let toastTimer
function toast(msg) {
  const el = document.querySelector('.toast')
  el.textContent = msg
  el.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.classList.remove('show'), 1600)
}

/* --------------------------------------------------- advance measurement */

/** Printable ASCII — the range a monospace grid is judged on. */
const REF_CHARS = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i))

/** Measured at a fixed 100px so the numbers are reusable ratios. */
const PROBE_SIZE = 100
let advanceCache = { key: null, map: null }

function measureAdvances(chars) {
  const fam = byId[state.family]
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:absolute;left:-99999px;top:0;visibility:hidden;white-space:pre;letter-spacing:0;line-height:1'
  probe.style.fontFamily = `"${fam.name}"`
  probe.style.fontStyle = state.style === 'italic' ? 'italic' : 'normal'
  probe.style.fontOpticalSizing = 'none'
  probe.style.fontVariationSettings = fvs()
  probe.style.fontFeatureSettings = ffs()
  probe.style.fontSize = `${PROBE_SIZE}px`

  const spans = chars.map((c) => {
    const s = document.createElement('span')
    // Block + max-content puts every glyph in its own shaping run. Left as
    // adjacent inlines, Chrome shapes across the boundaries and a ligature
    // like <=> collapses into one box, handing the rest a zero advance.
    s.style.cssText = 'display:block;width:max-content'
    s.textContent = c
    probe.append(s)
    return s
  })
  document.body.append(probe)
  const map = new Map(spans.map((s, i) => [chars[i], s.getBoundingClientRect().width]))
  probe.remove()
  return map
}

const fontSpec = () =>
  `${state.style === 'italic' ? 'italic ' : ''}${PROBE_SIZE}px "${byId[state.family].name}"`

const pendingLoads = new Set()

function advances() {
  const spec = fontSpec()
  // Measuring before the webfont lands gives fallback metrics, so the ready
  // flag is part of the cache key — the numbers correct themselves on load.
  const ready = document.fonts.check(spec)
  if (!ready && !pendingLoads.has(spec)) {
    pendingLoads.add(spec)
    document.fonts.load(spec).then(() => {
      pendingLoads.delete(spec)
      if (state.view === 'grid') updateGrid()
    })
  }
  const key = `${state.family}|${state.style}|${fvs()}|${ffs()}|${ready}`
  if (advanceCache.key !== key) advanceCache = { key, map: measureAdvances(REF_CHARS), ready }
  return advanceCache.map
}

/**
 * The advance shared by the most glyphs — the grid a mono face is built on.
 * The word space is judged separately: it is a gap, not a letter cell, and a
 * face can put every letterform on one advance while spacing words narrower.
 */
function gridMetrics() {
  const map = advances()
  const letters = [...map.entries()].filter(([ch]) => ch !== ' ')

  const counts = new Map()
  for (const [, w] of letters) {
    const k = Math.round(w * 10) / 10
    counts.set(k, (counts.get(k) || 0) + 1)
  }
  let width = 0
  let best = 0
  for (const [w, n] of counts) {
    if (n > best || (n === best && w < width)) {
      best = n
      width = w
    }
  }

  const onGrid = (w) => Math.abs(w - width) <= 0.5
  const offGrid = letters
    .filter(([, w]) => !onGrid(w))
    .map(([ch, w]) => ({ ch, label: ch, ratio: w / width }))
    .sort((a, b) => b.ratio - a.ratio)

  const space = map.get(' ')
  return {
    width,
    total: letters.length,
    onGrid: letters.length - offGrid.length,
    offGrid,
    space,
    spaceOff: space != null && !onGrid(space),
    map,
    ready: advanceCache.ready,
  }
}

const cellPx = (metrics) => (metrics.width / PROBE_SIZE) * state.size + state.tracking * state.size

/* ------------------------------------------------------- proximity field */

const FALLOFFS = {
  gauss: { name: 'Gaussian', fn: (t) => Math.exp(-4 * t * t) },
  smooth: { name: 'Smooth', fn: (t) => (t >= 1 ? 0 : 0.5 * (1 + Math.cos(Math.PI * t))) },
  linear: { name: 'Linear', fn: (t) => Math.max(0, 1 - t) },
  spike: { name: 'Spike', fn: (t) => 1 / (1 + 16 * t * t) },
}

const hover = {
  wrap: null,
  spans: [],
  centers: [],
  weights: null,
  pointer: { x: -1e6, y: -1e6 },
  pinned: false,
  raf: null,
}

function peakWeight() {
  const axis = current().axes.find((a) => a.tag === 'wght')
  if (!axis) return 400
  return state.hoverPeak == null ? axis.max : clamp(state.hoverPeak, axis.min, axis.max)
}

/**
 * Positions are re-read every frame from where the glyphs actually are.
 * Freezing them at rest is cheaper, but letters shift as they thicken and the
 * field then peaks a character or two away from the pointer. All the reads
 * happen before any write, so this costs one forced layout per frame.
 */
function readCentres() {
  const base = hover.wrap.getBoundingClientRect()
  for (let i = 0; i < hover.spans.length; i++) {
    const r = hover.spans[i].getBoundingClientRect()
    hover.centers[i] = { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 }
  }
}

function hoverFrame() {
  const axis = current().axes.find((a) => a.tag === 'wght')
  if (!axis || !hover.wrap) {
    hover.raf = null
    return
  }

  readCentres()

  const base = clamp(state.axes.wght ?? 400, axis.min, axis.max)
  const peak = peakWeight()
  const falloff = FALLOFFS[state.hoverFalloff].fn
  const r = Math.max(1, state.hoverRadius)
  const ease = clamp(state.hoverSmooth, 0, 0.95)
  const { x: px, y: py } = hover.pointer

  let moving = false
  for (let i = 0; i < hover.spans.length; i++) {
    const c = hover.centers[i]
    const d = Math.hypot(c.x - px, c.y - py)
    const target = base + (peak - base) * falloff(d / r)
    const next = hover.weights[i] + (target - hover.weights[i]) * (1 - ease)
    if (Math.abs(next - hover.weights[i]) > 0.05) moving = true
    hover.weights[i] = next
    hover.spans[i].style.fontVariationSettings = fvs({ wght: Math.round(next) })
  }

  hover.raf = moving ? requestAnimationFrame(hoverFrame) : null
}

const kickHover = () => {
  if (!hover.raf && hover.wrap) hover.raf = requestAnimationFrame(hoverFrame)
}

function teardownHover() {
  if (hover.raf) cancelAnimationFrame(hover.raf)
  hover.raf = null
  hover.wrap = null
  hover.spans = []
  hover.centers = []
  hover.weights = null
  hover.pinned = false
  hover.pointer = { x: -1e6, y: -1e6 }
}

function buildProximity(inner) {
  const wrap = h('<div class="hoverview"></div>')
  const spans = []
  for (const line of state.text.split('\n')) {
    const row = h('<div class="hline"></div>')
    for (const ch of [...line]) {
      const span = h('<span class="hchar"></span>')
      span.textContent = ch
      row.append(span)
      spans.push(span)
    }
    if (!row.childElementCount) row.append(h('<span class="hchar">&nbsp;</span>'))
    wrap.append(row)
  }

  hover.wrap = wrap
  hover.spans = spans
  hover.weights = new Float32Array(spans.length).fill(clamp(state.axes.wght ?? 400, 1, 1000))

  // Tracking on the whole stage rather than the glyph box, so the field still
  // responds when the pointer is just above or below the line.
  const track = (e) => {
    if (hover.pinned) return
    const r = wrap.getBoundingClientRect()
    hover.pointer = { x: e.clientX - r.left, y: e.clientY - r.top }
    kickHover()
  }
  inner.addEventListener('pointermove', track)
  inner.addEventListener('pointerdown', (e) => {
    hover.pinned = !hover.pinned
    wrap.classList.toggle('pinned', hover.pinned)
    if (!hover.pinned) track(e)
    toast(hover.pinned ? 'Field pinned — click again to release' : 'Field released')
  })
  inner.addEventListener('pointerleave', () => {
    if (hover.pinned) return
    hover.pointer = { x: -1e6, y: -1e6 }
    kickHover()
  })

  inner.classList.add('proximity-stage')
  inner.append(wrap)
  inner.append(
    h(
      `<div class="grid-report"><p>Move the pointer across the line — each character is weighted by its distance from it. Click to pin the field in place.</p></div>`
    )
  )
  requestAnimationFrame(kickHover)
}

/* ------------------------------------------------------------------ head */

function renderHead() {
  const fam = byId[state.family]
  const hasItalic = !!fam.styles.italic
  return h(`
    <header class="head">
      <a class="back" href="/" title="All experiments">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Experiments
      </a>
      <div class="brand">Variable type tester <span>· MaaS</span></div>
      <div class="segment" data-seg="family">
        ${FAMILIES.map(
          (f) =>
            `<button data-val="${f.id}" aria-pressed="${f.id === state.family}">${f.name}</button>`
        ).join('')}
      </div>
      <div class="segment" data-seg="style">
        <button data-val="upright" aria-pressed="${state.style === 'upright'}">Roman</button>
        ${hasItalic ? `<button data-val="italic" aria-pressed="${state.style === 'italic'}">Italic</button>` : ''}
      </div>
      <div class="segment" data-seg="view">
        ${[
          ['type', 'Type'],
          ['waterfall', 'Waterfall'],
          ['ramp', 'Weights'],
          ['grid', 'Grid'],
          ['proximity', 'Proximity'],
          ['glyphs', 'Glyphs'],
        ]
          .map(([v, label]) => `<button data-val="${v}" aria-pressed="${state.view === v}">${label}</button>`)
          .join('')}
      </div>
      <div class="spacer"></div>
      <button class="btn" data-act="share">Copy link</button>
      <button class="btn" data-act="reset">Reset</button>
    </header>
  `)
}

/* ----------------------------------------------------------------- stage */

function renderStage() {
  teardownHover()
  const stage = h('<main class="stage"><div class="stage-inner"></div></main>')
  const inner = stage.firstElementChild

  if (state.view === 'type') {
    const p = h(`<div class="specimen" contenteditable="plaintext-only" spellcheck="false"></div>`)
    p.textContent = state.text
    p.addEventListener('input', () => {
      state.text = p.textContent
      saveHash()
      // keep the other views in sync without stealing the caret
    })
    inner.append(p)
  }

  if (state.view === 'waterfall') {
    const sizes = [160, 120, 90, 66, 48, 36, 27, 20, 15, 11]
    const line = state.text.split('\n')[0] || state.text
    for (const s of sizes) {
      const row = h(`
        <div class="row">
          <span class="row-label">${s} px</span>
          <span class="row-text" style="--row-size:${s}px"></span>
        </div>`)
      row.querySelector('.row-text').textContent = line
      inner.append(row)
    }
  }

  if (state.view === 'ramp') {
    const line = state.text.split('\n')[0] || state.text
    for (const step of weightSteps()) {
      const row = h(`
        <div class="row">
          <span class="row-label">${esc(step.name)} · wght ${round(step.wght)}</span>
          <span class="row-text" style="--row-size:${Math.min(state.size, 96)}px; --row-fvs:${esc(
            fvs({ wght: step.wght })
          )}"></span>
        </div>`)
      row.querySelector('.row-text').textContent = line
      inner.append(row)
    }
  }

  if (state.view === 'grid') {
    inner.append(h('<div class="gridwrap"></div>'))
    inner.append(h('<div class="grid-report"></div>'))
    // filled in by updateGrid(), which also runs on every slider move
  }

  if (state.view === 'proximity') buildProximity(inner)

  if (state.view === 'glyphs') {
    const cps = current().codepoints
    inner.append(
      h(
        `<p class="glyph-note">${byId[state.family].name} ${state.style === 'italic' ? 'Italic' : 'Roman'} · ${
          cps.length
        } glyphs in cmap · click to append to the specimen</p>`
      )
    )
    const grid = h('<div class="glyphs"></div>')
    const frag = document.createDocumentFragment()
    for (const cp of cps) {
      if (cp < 0x20 || (cp >= 0x7f && cp <= 0xa0)) continue
      const ch = String.fromCodePoint(cp)
      const cell = h(
        `<button class="glyph" data-cp="U+${cp.toString(16).toUpperCase().padStart(4, '0')}" data-ch="${esc(ch)}"></button>`
      )
      cell.textContent = ch
      frag.append(cell)
    }
    grid.append(frag)
    grid.addEventListener('click', (e) => {
      const cell = e.target.closest('.glyph')
      if (!cell) return
      state.text += cell.dataset.ch
      toast(`Appended ${cell.dataset.cp}`)
      saveHash()
    })
    inner.append(grid)
  }

  return stage
}

/** Naming every exception only helps while there are few of them. */
function offGridReport(m) {
  if (!m.offGrid.length) return ''
  const cell = (o) => `<span><i>${esc(o.label)}</i>${round(o.ratio, 2)}×</span>`

  if (m.offGrid.length <= 20) {
    return `<p class="off-list">Off the grid: ${m.offGrid.map(cell).join('')}</p>`
  }

  const sorted = [...m.map.entries()].sort((a, b) => a[1] - b[1])
  const ends = [sorted[0], sorted[sorted.length - 1]].map(([ch, w]) => ({
    label: ch === ' ' ? '␣' : ch,
    ratio: w / m.width,
    em: w / PROBE_SIZE,
  }))
  return `<p class="off-list">Advances run from ${ends
    .map((e) => `<span><i>${esc(e.label)}</i>${round(e.em, 3)}em</span>`)
    .join(' to ')} — ${m.offGrid.length} of ${m.total} sit off the modal cell.</p>`
}

function updateGrid() {
  const wrap = document.querySelector('.gridwrap')
  if (!wrap) return
  const m = gridMetrics()
  const cell = cellPx(m)

  wrap.style.setProperty('--cell', `${cell}px`)
  wrap.style.setProperty('--line-h', `${state.size * state.lh}px`)
  wrap.classList.toggle('snap', state.snap)

  const frag = document.createDocumentFragment()
  for (const line of state.text.split('\n')) {
    const row = h('<div class="gline"></div>')
    for (const ch of [...line]) {
      const w = m.map.get(ch)
      const off = w != null && Math.abs(w - m.width) > 0.5
      const span = h(`<span class="gcell${off ? ' off' : ''}${w == null ? ' unknown' : ''}"></span>`)
      span.textContent = ch
      if (off) span.title = `${ch} · ${round(w / m.width, 3)}× the grid cell`
      row.append(span)
    }
    if (!row.childElementCount) row.append(h('<span class="gcell">&nbsp;</span>'))
    frag.append(row)
  }
  wrap.replaceChildren(frag)

  const share = Math.round((m.onGrid / m.total) * 100)
  const n = m.offGrid.length
  const verdict =
    n === 0
      ? 'Monospaced — every printable ASCII letterform sits on one advance.'
      : share >= 70
        ? `Duospace — the face runs on one advance with ${n} letterform${n === 1 ? '' : 's'} drawn off it.`
        : 'Proportional — glyphs are spaced individually, there is no shared grid.'

  const report = document.querySelector('.grid-report')
  report.innerHTML = `
    <p><b>${esc(byId[state.family].name)}${state.style === 'italic' ? ' Italic' : ''}</b> at wght ${round(
      state.axes.wght ?? 400
    )}${state.axes.opsz != null ? `, opsz ${round(state.axes.opsz, 1)}` : ''} — ${esc(verdict)}</p>
    <p>${m.onGrid} of ${m.total} letterforms measure ${round(m.width / PROBE_SIZE, 3)}em (${round(
      cell,
      2
    )}px here) · ${share}%</p>
    ${offGridReport(m)}
    ${
      m.spaceOff
        ? `<p>Word space is ${round(m.space / PROBE_SIZE, 3)}em — ${round(
            m.space / m.width,
            2
          )}× the cell, so text with spaces still will not hold a column grid.</p>`
        : ''
    }
    ${
      current().monoFeature && !state.features[current().monoFeature.tag]
        ? `<p class="grid-hint">This face ships a monospace switch — <code>"${
            current().monoFeature.tag
          }" 1</code> narrows ${current()
            .monoFeature.chars.map((c) => `<b>${esc(c)}</b>`)
            .join(' ')} onto the cell. <button class="btn" data-act="mono-on">Turn it on</button></p>`
        : ''
    }
    ${m.ready === false ? '<p>measuring…</p>' : ''}`
}

function weightSteps() {
  const axis = current().axes.find((a) => a.tag === 'wght')
  if (!axis) return [{ name: 'Regular', wght: 400 }]

  const opszAxis = current().axes.find((a) => a.tag === 'opsz')
  let instances = current().instances
  if (opszAxis) {
    // Named instances exist at each optical master; use the group nearest the
    // current opsz so the labels actually match what is on screen.
    const opszValues = [...new Set(instances.map((i) => i.coords.opsz))]
    const nearest = opszValues.reduce((a, b) =>
      Math.abs(b - state.axes.opsz) < Math.abs(a - state.axes.opsz) ? b : a
    )
    instances = instances.filter((i) => i.coords.opsz === nearest)
  }

  const seen = new Set()
  const steps = []
  for (const inst of instances) {
    const w = inst.coords.wght
    if (w == null || seen.has(w)) continue
    seen.add(w)
    steps.push({ name: inst.name, wght: w })
  }
  if (steps.length >= 3) return steps.sort((a, b) => a.wght - b.wght)

  return Array.from({ length: 9 }, (_, i) => {
    const w = axis.min + ((axis.max - axis.min) * i) / 8
    return { name: `Step ${i + 1}`, wght: w }
  })
}

/* ----------------------------------------------------------------- panel */

const axisInputs = new Map()

function slider({ tag, name, min, max, step, value, unit = '', decimals = 0, onInput }) {
  const el = h(`
    <div class="ctl">
      <div class="ctl-head">
        <span class="ctl-name">${esc(name)}${tag ? `<code>${tag}</code>` : ''}</span>
        <input class="ctl-val" type="number" min="${min}" max="${max}" step="${step}" value="${round(
          value,
          decimals
        )}" aria-label="${esc(name)} value" />
      </div>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${esc(name)}" />
    </div>
  `)
  const range = el.querySelector('input[type=range]')
  const num = el.querySelector('.ctl-val')
  const paint = () => {
    range.style.setProperty('--pct', `${((range.valueAsNumber - min) / (max - min)) * 100}%`)
  }
  const set = (v, from) => {
    const val = clamp(v, min, max)
    if (from !== 'range') range.value = val
    if (from !== 'num') num.value = round(val, decimals)
    paint()
    onInput(val)
  }
  range.addEventListener('input', () => set(range.valueAsNumber, 'range'))
  num.addEventListener('input', () => {
    if (num.value !== '' && !Number.isNaN(num.valueAsNumber)) set(num.valueAsNumber, 'num')
  })
  paint()
  return { el, set: (v) => set(v, 'external'), unit }
}

function group(title, open = true) {
  const el = h(
    `<details class="group" ${open ? 'open' : ''}><summary>${esc(title)}</summary><div class="group-body"></div></details>`
  )
  return { el, body: el.querySelector('.group-body') }
}

function renderPanel() {
  axisInputs.clear()
  const panel = h('<aside class="panel"></aside>')
  const fam = byId[state.family]
  const data = current()

  /* --- axes ------------------------------------------------------------ */
  const axes = group('Variable axes')
  for (const a of data.axes) {
    const s = slider({
      tag: a.tag,
      name: a.name,
      min: a.min,
      max: a.max,
      step: a.tag === 'wght' ? 1 : 0.1,
      decimals: a.tag === 'wght' ? 0 : 1,
      value: state.axes[a.tag],
      onInput: (v) => {
        state.axes[a.tag] = v
        if (a.tag === 'opsz') state.autoOpsz = false
        sync()
      },
    })
    axisInputs.set(a.tag, s)
    axes.body.append(s.el)
  }

  if (data.axes.some((a) => a.tag === 'opsz')) {
    const auto = h(`
      <label class="feat">
        <input type="checkbox" ${state.autoOpsz ? 'checked' : ''} />
        <span>Track optical size to font size</span>
      </label>`)
    auto.querySelector('input').addEventListener('change', (e) => {
      state.autoOpsz = e.target.checked
      sync()
    })
    axes.body.append(auto)
  }

  const steps = weightSteps()
  if (steps.length > 1) {
    const chips = h('<div class="chips"></div>')
    for (const s of steps) {
      const c = h(`<button class="chip" data-wght="${s.wght}">${esc(s.name)}</button>`)
      c.addEventListener('click', () => {
        state.axes.wght = s.wght
        axisInputs.get('wght')?.set(s.wght)
        sync()
      })
      chips.append(c)
    }
    axes.body.append(chips)
  }

  const anim = h('<div class="btn-row"><button class="btn" data-act="animate">Animate weight</button></div>')
  axes.body.append(anim)
  panel.append(axes.el)

  /* --- monospace switch ------------------------------------------------ */
  const mono = data.monoFeature
  if (mono) {
    const box = group('Monospace')
    const row = h(`
      <label class="feat feat-lead">
        <input type="checkbox" ${state.features[mono.tag] ? 'checked' : ''} />
        <span>Monospace</span>
        <span class="feat-tag">${mono.tag}</span>
      </label>`)
    row.querySelector('input').addEventListener('change', (e) => {
      state.features[mono.tag] = e.target.checked
      renderAll()
    })
    box.body.append(row)
    box.body.append(
      h(
        `<div class="feat-sub" style="margin:0">Swaps ${mono.chars
          .map((c) => `<b>${esc(c)}</b>`)
          .join(' ')} for narrow alternates drawn at ${mono.to}em instead of ${mono.from}em, putting every
         letter on one advance. Ships in the font as <code>${mono.tag}</code> — one line of CSS, no fallback needed.</div>`
      )
    )
    panel.append(box.el)
  }

  /* --- layout ---------------------------------------------------------- */
  const layout = group('Layout')
  const size = slider({
    name: 'Font size',
    min: 8,
    max: 480,
    step: 1,
    value: state.size,
    onInput: (v) => {
      state.size = v
      sync()
    },
  })
  axisInputs.set('__size', size)
  layout.body.append(size.el)

  const lh = slider({
    name: 'Line height',
    min: 0.6,
    max: 3,
    step: 0.01,
    decimals: 2,
    value: state.lh,
    onInput: (v) => {
      state.lh = v
      sync()
    },
  })
  layout.body.append(lh.el)

  const tr = slider({
    name: 'Letter spacing',
    min: -0.12,
    max: 0.6,
    step: 0.001,
    decimals: 3,
    value: state.tracking,
    onInput: (v) => {
      state.tracking = v
      sync()
    },
  })
  layout.body.append(tr.el)

  layout.body.append(
    segmentField('Align', 'align', [
      ['left', 'Left'],
      ['center', 'Centre'],
      ['right', 'Right'],
      ['justify', 'Justify'],
    ])
  )
  layout.body.append(
    segmentField('Case', 'transform', [
      ['none', 'As typed'],
      ['uppercase', 'AA'],
      ['lowercase', 'aa'],
      ['capitalize', 'Aa'],
    ])
  )
  panel.append(layout.el)

  /* --- grid ------------------------------------------------------------ */
  if (state.view === 'grid') {
    const grid = group('Spacing grid')
    const snap = h(`
      <label class="feat">
        <input type="checkbox" ${state.snap ? 'checked' : ''} />
        <span>Force every glyph into one cell</span>
      </label>`)
    snap.querySelector('input').addEventListener('change', (e) => {
      state.snap = e.target.checked
      sync()
    })
    grid.body.append(snap)
    grid.body.append(
      h(
        `<div class="feat-sub" style="margin:0">Off unforced, glyphs keep their real advance and you can see where they drift off the rules. On, each one is centred in a cell — what the face would look like if it were strictly monospaced.</div>`
      )
    )
    panel.append(grid.el)
  }

  /* --- proximity ------------------------------------------------------- */
  if (state.view === 'proximity') {
    const wghtAxis = data.axes.find((a) => a.tag === 'wght')
    const prox = group('Proximity field')

    prox.body.append(
      slider({
        name: 'Radius',
        min: 30,
        max: 1200,
        step: 5,
        value: state.hoverRadius,
        onInput: (v) => {
          state.hoverRadius = v
          sync()
        },
      }).el
    )

    if (wghtAxis) {
      prox.body.append(
        slider({
          tag: 'wght',
          name: 'Peak weight',
          min: wghtAxis.min,
          max: wghtAxis.max,
          step: 1,
          value: peakWeight(),
          onInput: (v) => {
            state.hoverPeak = v
            sync()
          },
        }).el
      )
      prox.body.append(
        h(
          `<div class="feat-sub" style="margin:0">The weight slider above sets the resting weight. Drag the peak below it to invert the effect — letters thin out under the cursor instead.</div>`
        )
      )
    }

    prox.body.append(
      slider({
        name: 'Smoothing',
        min: 0,
        max: 0.95,
        step: 0.01,
        decimals: 2,
        value: state.hoverSmooth,
        onInput: (v) => {
          state.hoverSmooth = v
          sync()
        },
      }).el
    )

    prox.body.append(
      segmentField(
        'Falloff',
        'hoverFalloff',
        Object.entries(FALLOFFS).map(([k, v]) => [k, v.name])
      )
    )
    panel.append(prox.el)
  }

  /* --- features -------------------------------------------------------- */
  const feats = group('OpenType features', false)
  const remaining = new Set(data.features)
  for (const g of FEATURE_GROUPS) {
    const tags = [...remaining].filter((t) => g.match(t)).sort()
    if (!tags.length) continue
    tags.forEach((t) => remaining.delete(t))
    const block = h(`<div><div class="feat-sub">${esc(g.name)}</div></div>`)
    for (const t of tags) {
      const row = h(`
        <label class="feat">
          <input type="checkbox" ${state.features[t] ? 'checked' : ''} />
          <span>${esc(featureLabel(t))}</span>
          <span class="feat-tag">${t}</span>
        </label>`)
      row.querySelector('input').addEventListener('change', (e) => {
        state.features[t] = e.target.checked
        sync()
      })
      block.append(row)
    }
    feats.body.append(block)
  }
  feats.body.append(
    h('<div class="btn-row"><button class="btn" data-act="feats-default">Reset features</button></div>')
  )
  panel.append(feats.el)

  /* --- colour ---------------------------------------------------------- */
  const colour = group('Colour', false)
  const row = h(`
    <div class="color-row">
      <label>Text <input type="color" value="${state.fg}" data-color="fg" /></label>
      <label>Background <input type="color" value="${state.bg}" data-color="bg" /></label>
    </div>`)
  row.querySelectorAll('input[type=color]').forEach((inp) =>
    inp.addEventListener('input', () => {
      state[inp.dataset.color] = inp.value
      sync()
    })
  )
  colour.body.append(row)

  const sw = h('<div class="swatches"></div>')
  for (const [bg, fg] of PALETTES) {
    const b = h(`<button class="swatch" style="--sw-bg:${bg};--sw-fg:${fg}" aria-label="${bg} on ${fg}"></button>`)
    b.addEventListener('click', () => {
      state.bg = bg
      state.fg = fg
      renderAll()
    })
    sw.append(b)
  }
  colour.body.append(sw)
  colour.body.append(h('<div class="btn-row"><button class="btn" data-act="invert">Swap text / background</button></div>'))
  panel.append(colour.el)

  /* --- text ------------------------------------------------------------ */
  const text = group('Sample text', false)
  const chips = h('<div class="chips"></div>')
  for (const [label, value] of [...PRESETS.common, ...(PRESETS[state.family] || [])]) {
    const c = h(`<button class="chip">${esc(label)}</button>`)
    c.addEventListener('click', () => {
      state.text = value
      state.view = 'type'
      renderAll()
    })
    chips.append(c)
  }
  text.body.append(chips)
  panel.append(text.el)

  /* --- css ------------------------------------------------------------- */
  const css = group('CSS', false)
  css.body.append(h('<pre class="css-out"></pre>'))
  css.body.append(
    h(`
    <div class="btn-row">
      <button class="btn" data-act="copy-css">Copy CSS</button>
      <button class="btn" data-act="share">Copy link</button>
    </div>`)
  )
  panel.append(css.el)

  /* --- about ----------------------------------------------------------- */
  const about = group('About this face', false)
  about.body.append(
    h(`
    <div class="meta">
      <p>${esc(fam.blurb)}</p>
      <dl>
        <dt>Version</dt><dd>${esc(data.version || '—')}</dd>
        <dt>Axes</dt><dd>${data.axes.map((a) => `${a.tag} ${round(a.min)}–${round(a.max)}`).join(', ')}</dd>
        <dt>Features</dt><dd>${data.features.length}</dd>
        <dt>Glyphs</dt><dd>${data.codepoints.length}</dd>
        <dt>Licence</dt><dd>${esc(fam.license)}</dd>
      </dl>
      <p style="margin-top:12px"><a href="${fam.repo}" target="_blank" rel="noreferrer noopener">${esc(
        fam.repo.replace('https://github.com/', '')
      )}</a></p>
    </div>`)
  )
  panel.append(about.el)

  return panel
}

function segmentField(label, key, options) {
  const el = h(`
    <div class="ctl">
      <div class="ctl-head"><span class="ctl-name">${esc(label)}</span></div>
      <div class="segment" style="width:100%">
        ${options
          .map(
            ([v, l]) =>
              `<button style="flex:1" data-val="${v}" aria-pressed="${state[key] === v}">${esc(l)}</button>`
          )
          .join('')}
      </div>
    </div>`)
  el.querySelector('.segment').addEventListener('click', (e) => {
    const b = e.target.closest('button')
    if (!b) return
    state[key] = b.dataset.val
    el.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b))
    sync()
  })
  return el
}

/* ------------------------------------------------------------------ sync */

function sync() {
  const inner = document.querySelector('.stage-inner')
  if (!inner) return

  if (state.autoOpsz) {
    const a = current().axes.find((x) => x.tag === 'opsz')
    if (a) {
      const v = clamp(state.size, a.min, a.max)
      state.axes.opsz = v
      axisInputs.get('opsz')?.set(v)
    }
  }

  const fam = byId[state.family]
  document.querySelector('.stage').style.setProperty('--stage-bg', state.bg)
  document.querySelector('.stage').style.setProperty('--stage-fg', state.fg)
  inner.style.setProperty('--ff', `"${fam.name}"`)
  inner.style.setProperty('--fvs', fvs())
  inner.style.setProperty('--ffs', ffs())
  inner.style.setProperty('--fstyle', state.style === 'italic' ? 'italic' : 'normal')
  inner.style.setProperty('--fsize', `${state.size}px`)
  inner.style.setProperty('--lh', String(state.lh))
  inner.style.setProperty('--tracking', trackingCss())
  inner.style.setProperty('--align', state.align)
  inner.style.setProperty('--transform', state.transform)

  if (state.view === 'grid') updateGrid()
  if (state.view === 'proximity') kickHover()

  // the weight ramp re-derives its own per-row settings
  if (state.view === 'ramp') {
    document.querySelectorAll('.row').forEach((row, i) => {
      const step = weightSteps()[i]
      if (!step) return
      row.querySelector('.row-label').textContent = `${step.name} · wght ${round(step.wght)}`
      row.querySelector('.row-text').style.setProperty('--row-fvs', fvs({ wght: step.wght }))
      row.querySelector('.row-text').style.setProperty('--row-size', `${Math.min(state.size, 96)}px`)
    })
  }

  document.querySelectorAll('.chip[data-wght]').forEach((c) => {
    c.setAttribute('aria-pressed', Number(c.dataset.wght) === Math.round(state.axes.wght ?? -1))
  })

  const out = document.querySelector('.css-out')
  if (out) out.innerHTML = cssSnippet()

  saveHash()
}

function cssSnippet() {
  const fam = byId[state.family]
  const data = current()
  const wght = data.axes.find((a) => a.tag === 'wght')
  const lines = [
    `@font-face {`,
    `  font-family: "${fam.name}";`,
    `  src: url("${data.file}") format("woff2");`,
    wght ? `  font-weight: ${wght.min} ${wght.max};` : null,
    `  font-style: ${state.style === 'italic' ? 'italic' : 'normal'};`,
    `}`,
    ``,
    `.specimen {`,
    `  font-family: "${fam.name}";`,
    state.style === 'italic' ? `  font-style: italic;` : null,
    `  font-variation-settings: ${fvs()};`,
    `  font-optical-sizing: none;`,
    ffs() !== 'normal' ? `  font-feature-settings: ${ffs()};` : null,
    `  font-size: ${round(state.size)}px;`,
    `  line-height: ${round(state.lh, 2)};`,
    state.tracking !== 0 ? `  letter-spacing: ${trackingCss()};` : null,
    state.align !== 'left' ? `  text-align: ${state.align};` : null,
    state.transform !== 'none' ? `  text-transform: ${state.transform};` : null,
    `  color: ${state.fg};`,
    `  background: ${state.bg};`,
    `}`,
  ].filter((l) => l !== null)
  return lines
    .map((l) => esc(l).replace(/(font-variation-settings|font-feature-settings|font-family):/g, '<b>$1</b>:'))
    .join('\n')
}

function plainCss() {
  return cssSnippet()
    .replace(/<\/?b>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
}

/* ---------------------------------------------------------------- render */

const app = document.querySelector('#app')

function renderAll() {
  const scroll = document.querySelector('.panel')?.scrollTop ?? 0
  const openGroups = [...document.querySelectorAll('.group')].map((g) => g.open)
  app.replaceChildren(renderHead(), renderStage(), renderPanel())
  const groups = document.querySelectorAll('.group')
  if (openGroups.length === groups.length) groups.forEach((g, i) => (g.open = openGroups[i]))
  document.querySelector('.panel').scrollTop = scroll
  sync()
}

/* -------------------------------------------------------------- actions */

let animId = null
function toggleAnimate(btn) {
  if (animId) {
    cancelAnimationFrame(animId)
    animId = null
    btn.textContent = 'Animate weight'
    return
  }
  const axis = current().axes.find((a) => a.tag === 'wght')
  if (!axis) return
  btn.textContent = 'Stop'
  const start = performance.now()
  const tick = (now) => {
    const t = ((now - start) / 3600) % 1
    const eased = (1 - Math.cos(t * Math.PI * 2)) / 2
    const v = Math.round(axis.min + (axis.max - axis.min) * eased)
    state.axes.wght = v
    axisInputs.get('wght')?.set(v)
    sync()
    animId = requestAnimationFrame(tick)
  }
  animId = requestAnimationFrame(tick)
}

app.addEventListener('click', async (e) => {
  const seg = e.target.closest('.segment[data-seg] button')
  if (seg) {
    const kind = seg.closest('.segment').dataset.seg
    const val = seg.dataset.val
    if (kind === 'family') {
      state.family = val
      if (!byId[val].styles[state.style]) state.style = 'upright'
      state.axes = defaultAxes(state.family, state.style)
      state.features = defaultFeatures(state.family, state.style)
    } else if (kind === 'style') {
      state.style = val
      const keep = { ...state.axes }
      state.axes = defaultAxes(state.family, state.style)
      for (const a of current().axes) if (keep[a.tag] != null) state.axes[a.tag] = clamp(keep[a.tag], a.min, a.max)
      const keepFeats = { ...state.features }
      state.features = defaultFeatures(state.family, state.style)
      for (const t of Object.keys(state.features)) if (t in keepFeats) state.features[t] = keepFeats[t]
    } else if (kind === 'view') {
      state.view = val
    }
    renderAll()
    return
  }

  const act = e.target.closest('[data-act]')?.dataset.act
  if (!act) return

  if (act === 'animate') toggleAnimate(e.target.closest('[data-act]'))
  if (act === 'invert') {
    ;[state.bg, state.fg] = [state.fg, state.bg]
    renderAll()
  }
  if (act === 'mono-on') {
    const mono = current().monoFeature
    if (mono) {
      state.features[mono.tag] = true
      renderAll()
      toast(`${mono.tag} on — fully monospaced`)
    }
  }
  if (act === 'feats-default') {
    state.features = defaultFeatures(state.family, state.style)
    renderAll()
  }
  if (act === 'reset') {
    location.hash = ''
    location.reload()
  }
  if (act === 'copy-css') {
    await navigator.clipboard.writeText(plainCss())
    toast('CSS copied')
  }
  if (act === 'share') {
    saveHash()
    await navigator.clipboard.writeText(location.href)
    toast('Link copied')
  }
})

/* ------------------------------------------------------------------ boot */

loadHash()
document.body.append(h('<div class="toast"></div>'))
renderAll()
document.fonts.ready.then(() => {
  advanceCache = { key: null, map: null }
  sync()
})
