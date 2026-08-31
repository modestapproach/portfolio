import './shell.css'
import './flow.css'
import { PALETTES } from './palettes.js'
import {
  prepareWithSegments,
  layoutNextLineRange,
  materializeLineRange,
  measureLineStats,
} from '@chenglou/pretext'
import { createLayout } from 'layout-sans'
import { justify } from 'justif'
import { hyphenateEnUS } from 'justif/hyphenate/en-us'

/* ------------------------------------------------------------ instrument */

/**
 * Every getBoundingClientRect is a chance for the browser to run layout.
 * Counting them is the only honest way to show that typesetting here costs
 * nothing — so the counter is real, not a claim in a caption. Range is patched
 * too: the spacing probe measures through ranges, and those reads count.
 */
let layoutReads = 0
for (const proto of [Element.prototype, Range.prototype]) {
  const native = proto.getBoundingClientRect
  proto.getBoundingClientRect = function () {
    layoutReads++
    return native.apply(this, arguments)
  }
}
const countReads = (fn) => {
  const before = layoutReads
  const value = fn()
  return { value, reads: layoutReads - before }
}

/* --------------------------------------------------------------- content */

const HEADLINE = 'Set in advance'
const STANDFIRST =
  'The web has never been able to answer a simple question: how tall will this text be before I put it on the page? Everything below is typeset without asking.'
const QUOTE = 'Measure once, then let the layout be arithmetic.'

const ARTICLE = `Typesetting has always been a two-pass problem on the web. You put the text in the document, you ask the browser how tall it turned out, and then you move everything else to accommodate the answer. The asking is the expensive part. Each question forces the browser to stop, resolve the entire layout, and hand back a number, and a page that asks five hundred questions stutters in a way users feel but cannot name.

Pretext removes the question. It measures each word once against the browser's own font engine, caches the widths, and from that point on the line breaking is arithmetic: walk the cached widths, keep a running total, break when the total exceeds the column. The text on this page was broken into lines before any of it existed in the document, which is why the counter in the panel reads zero.

LayoutSans is the layer above. Give it a tree of boxes with flex and grid rules and it returns exact pixel positions for every one of them, in plain JavaScript, with no DOM and no WebAssembly. The columns you are reading were positioned that way, including the rail they sit on, which is deliberately wider than the page.

That is the part worth dwelling on. When measurement is free, layout stops being something you specify and becomes something you search. The column width here is not a number anyone typed. You choose an average line length in characters and the page binary-searches the width that actually produces it, measuring candidate after candidate until the average lands where you asked. Every one of those passes would cost a forced reflow if it went through the document.

Justif then sets the type. It breaks each column with the Knuth-Plass algorithm, which weighs the column as a whole rather than one line at a time, hyphenates with TeX patterns, hangs punctuation into the margin, and stretches or condenses the glyphs themselves along the width axis to even out the colour of the text. That last trick needs a variable font with a width axis, which is why the body is set in Junicode rather than in a monospace.

None of this requires giving up the document. The lines are ordinary text nodes. Select them, copy them, search them with the browser's own find, let a screen reader read them aloud. Prediction decided where the breaks go; the document still holds the words. That distinction is the whole argument: the speed comes from measuring differently, not from abandoning the text.

Measure is the quiet variable behind all of it. A line of thirty characters holds two or three word spaces, so any slack the line breaker cannot place lands on them as a visible gap, and no algorithm can rescue it. Somewhere around sixty-five characters a line has enough spaces to absorb its slack invisibly. Drag the readability control and watch the spacing statistics move with it.`

const FLAT = ARTICLE.replace(/\s+/g, ' ').trim()
const TOTAL_CHARS = FLAT.length

/**
 * Only Junicode carries a wdth axis, so it is the only face where Justif's
 * font-expansion does anything. Interface has an opsz axis, but optical sizing
 * lives outside the canvas font shorthand, so it stays pinned at its default —
 * the same reason neither library will look at font-variation-settings.
 */
const FACES = [
  { id: 'Junicode', label: 'Junicode', kind: 'serif', wdth: true, axes: 'wght 300–700, wdth 75–125' },
  { id: 'Index', label: 'Index', kind: 'monospace', wdth: false, axes: 'wght 100–700' },
  { id: 'Interface', label: 'Interface', kind: 'sans-serif', wdth: false, axes: 'wght 100–900 (opsz pinned)' },
]
const faceOf = (id) => FACES.find((f) => f.id === id) ?? FACES[0]

/* ----------------------------------------------------------------- state */

const state = {
  face: 'Junicode',
  targetChars: 66,
  gap: 34,
  size: 17,
  leading: 1.5,
  weight: 400,
  palette: 3,
  showRules: false,
  mode: 'justif', // 'ragged' | 'native' | 'justif'
  hanging: 'first-line-and-line-ends',
  scroll: 0, // leftmost visible column
}

const fontString = (size = state.size, weight = state.weight) => `${weight} ${size}px ${state.face}`

/* --------------------------------------------------------------- prepare */

const prepCache = new Map()
let prepareMs = 0

function prep(text, font) {
  const key = `${font} ${text}`
  let hit = prepCache.get(key)
  if (!hit) {
    const t = performance.now()
    hit = prepareWithSegments(text, font)
    prepareMs += performance.now() - t
    prepCache.set(key, hit)
  }
  return hit
}

/* -------------------------------------------------- solve for the measure */

/**
 * Average characters per line is total characters over line count, so the
 * readability control reduces to: find the width whose line count is
 * TOTAL_CHARS / target. Each probe is one measureLineStats call — arithmetic
 * over cached widths, no DOM — which is what makes it affordable to search a
 * width rather than guess one.
 */
function solveWidthForMeasure(body, target, maxWidth) {
  const wanted = TOTAL_CHARS / target
  let lo = 60
  let hi = Math.max(120, maxWidth)
  let probes = 0
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2
    const lines = measureLineStats(body, mid).lineCount
    probes++
    // Wider column → fewer lines → longer average line.
    if (lines > wanted) lo = mid
    else hi = mid
  }
  const width = Math.min(maxWidth, (lo + hi) / 2)
  const lineCount = measureLineStats(body, width).lineCount
  probes++
  return { width, lineCount, actual: TOTAL_CHARS / lineCount, probes }
}

/* --------------------------------------------------------------- typeset */

/**
 * Every vertical dimension is predicted, never measured. The body is a rail of
 * as many columns as the article needs at the solved width — most of them off
 * the right edge until you scroll.
 */
function typeset({ targetChars, gap, size, leading, pageW, pageH }) {
  const lineHeight = size * leading
  const body = prep(ARTICLE, fontString(size))

  // --- masthead, measured before any of it exists in the document ---------
  const headSize = Math.max(30, Math.min(64, pageW * 0.055))
  const headLH = headSize * 1.04
  const headH =
    measureLineStats(prep(HEADLINE, `600 ${headSize}px ${state.face}`), pageW).lineCount * headLH

  const standSize = size * 1.04
  const standLH = standSize * 1.5
  const standPrep = prep(STANDFIRST, `400 ${standSize}px ${state.face}`)

  const quoteSize = size * 1.85
  const quoteLH = quoteSize * 1.2
  const quotePrep = prep(QUOTE, `500 ${quoteSize}px ${state.face}`)
  const quoteAvail = Math.min(pageW * 0.4, 520)
  const quoteStats = measureLineStats(quotePrep, quoteAvail)
  const quoteW = Math.ceil(quoteStats.maxLineWidth) // shrink-wrap
  const quoteH = quoteStats.lineCount * quoteLH

  const standW = pageW - quoteW - gap * 2
  const standH = measureLineStats(standPrep, standW).lineCount * standLH
  const introH = Math.max(standH, quoteH)

  // --- page frame ---------------------------------------------------------
  const frame = createLayout({
    type: 'flex',
    direction: 'column',
    width: pageW,
    height: pageH,
    gap: Math.round(lineHeight * 1.3),
    children: [
      { type: 'box', height: headH },
      {
        type: 'flex',
        direction: 'row',
        height: introH,
        gap: gap * 2,
        children: [{ type: 'box', flex: 1 }, { type: 'box', width: quoteW }],
      },
      { type: 'box', flex: 1 },
      { type: 'box', height: 42 },
    ],
  }).compute()

  const byId = new Map(frame.map((r) => [r.nodeId, r]))
  const strip = byId.get('0.2')
  const navBox = byId.get('0.3')

  // --- solve the column width from the requested measure ------------------
  const solved = solveWidthForMeasure(body, targetChars, Math.max(120, strip.width))
  const linesPerColumn = Math.max(1, Math.floor(strip.height / lineHeight))
  const columnCount = Math.max(1, Math.ceil(solved.lineCount / linesPerColumn))

  // --- the rail: LayoutSans again, this time wider than the page ----------
  const railW = columnCount * solved.width + (columnCount - 1) * gap
  const rail = createLayout({
    type: 'flex',
    direction: 'row',
    width: railW,
    height: strip.height,
    gap,
    children: Array.from({ length: columnCount }, () => ({
      type: 'box',
      width: solved.width,
      height: strip.height,
    })),
  }).compute()
  const railBoxes = rail.filter((r) => r.nodeId !== '0')

  // --- flow the article through the rail ----------------------------------
  let position = { segmentIndex: 0, graphemeIndex: 0 }
  let done = false
  const columns = []
  for (const box of railBoxes) {
    const lines = []
    for (let i = 0; i < linesPerColumn && !done; i++) {
      const range = layoutNextLineRange(body, position, box.width)
      if (range === null) {
        done = true
        break
      }
      lines.push(materializeLineRange(body, range).text)
      position = range.end
    }
    columns.push({ box, lines })
  }

  return {
    masthead: {
      headline: byId.get('0.0'),
      standfirst: byId.get('0.1.0'),
      quote: byId.get('0.1.1'),
      headSize,
      headLH,
      standSize,
      standLH,
      quoteSize,
      quoteLH,
      quoteAvail,
      quoteW,
    },
    strip,
    navBox,
    railW,
    columns: columns.filter((c) => c.lines.length),
    lineHeight,
    linesPerColumn,
    solved,
  }
}

/* ------------------------------------------------------------ fit column */

/**
 * Snaps size and leading so whole lines fill the column height exactly — no
 * dangling half line at the foot of every column. Pure search again.
 */
function fitColumn(pageW, pageH) {
  let best = null
  let candidates = 0
  const t0 = performance.now()
  for (let size = 14; size <= 22; size++) {
    for (let leading = 1.25; leading <= 1.95; leading += 0.01) {
      const r = typeset({ targetChars: state.targetChars, gap: state.gap, size, leading, pageW, pageH })
      candidates++
      const leftover = r.strip.height - r.linesPerColumn * r.lineHeight
      const snug = 1 - Math.min(1, leftover / r.lineHeight)
      const comfort = 1 - Math.min(1, Math.abs(leading - 1.5) / 0.45)
      const scale = 1 - Math.min(1, Math.abs(size - 17) / 5)
      const score = snug * 0.55 + comfort * 0.27 + scale * 0.18
      if (!best || score > best.score) best = { size, leading, score, leftover }
    }
  }
  return { best, candidates, ms: performance.now() - t0 }
}

/* ------------------------------------------------------------- benchmark */

function benchmark(width, n = 200) {
  const lineHeight = state.size * state.leading
  const paragraphs = ARTICLE.split('\n\n')
  const sample = Array.from({ length: n }, (_, i) => paragraphs[i % paragraphs.length])

  const preparedList = sample.map((p) => prepareWithSegments(p, fontString()))
  const tPretext = performance.now()
  let h1 = 0
  for (const p of preparedList) h1 += measureLineStats(p, width).lineCount * lineHeight
  const pretextMs = performance.now() - tPretext

  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;left:-99999px;top:0;width:${width}px;font:${fontString()};line-height:${lineHeight}px;visibility:hidden`
  document.body.append(probe)
  const tDom = performance.now()
  let h2 = 0
  for (const p of sample) {
    probe.textContent = p
    h2 += probe.getBoundingClientRect().height
  }
  const domMs = performance.now() - tDom
  probe.remove()

  return { n, pretextMs, domMs, ratio: domMs / pretextMs, h1: Math.round(h1), h2: Math.round(h2) }
}

/* --------------------------------------------------------- spacing probe */

function naturalSpace(font) {
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = font
  return ctx.measureText('a a').width - ctx.measureText('aa').width
}

/**
 * Measures every rendered word space by ranging over the space characters.
 * Whatever produced the spacing — native justification, Justif, or neither —
 * it is measured the same way, so the settings compare on equal terms.
 */
function spacingProfile(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const byLine = new Map()
  let node
  while ((node = walker.nextNode())) {
    const text = node.nodeValue
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') continue
      const range = document.createRange()
      range.setStart(node, i)
      range.setEnd(node, i + 1)
      const rect = range.getBoundingClientRect()
      if (rect.width <= 0) continue
      const key = Math.round(rect.top)
      if (!byLine.has(key)) byLine.set(key, [])
      byLine.get(key).push(rect.width)
    }
  }
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length
  const lines = [...byLine.entries()].sort((a, b) => a[0] - b[0]).map(([, w]) => w)
  // The last line of a column is never justified; including it would
  // understate the stretch on every other line.
  const body = lines.length > 1 ? lines.slice(0, -1) : lines
  const flat = body.flat()
  if (flat.length < 4) return null
  const lineMeans = body.map(mean)
  return {
    spaces: flat.length,
    lines: body.length,
    mean: mean(flat),
    loosestLine: Math.max(...lineMeans),
    tightestLine: Math.min(...lineMeans),
  }
}

/* ----------------------------------------------------------------- shell */

const el = (html) => {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild
}
const fmt = (n, p = 2) => Number(n.toFixed(p)).toString()
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

const app = document.querySelector('#app')
app.append(
  el(`
  <div class="flow-shell">
    <header class="flow-head">
      <a class="back" href="/" title="All experiments">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Experiments
      </a>
      <div class="brand">The flow <span>· Pretext × LayoutSans × Justif</span></div>
      <div class="spacer"></div>
      <div class="pager">
        <button class="btn icon" data-act="prev" aria-label="Previous column">‹</button>
        <span class="pager-label" id="pager-label">—</span>
        <button class="btn icon" data-act="next" aria-label="Next column">›</button>
      </div>
      <button class="btn primary" data-act="fit">Fit column</button>
      <button class="btn" data-act="bench">Benchmark vs DOM</button>
    </header>
    <main class="paper"><div class="page" id="page"></div></main>
    <aside class="side" id="side"></aside>
  </div>`)
)

const page = document.querySelector('#page')
const side = document.querySelector('#side')
let lastRun = null
let justifController = null
let wheelAccum = 0
let spacingTimer = null

/** Re-reads the word spacing of whichever columns are currently on screen. */
function refreshSpacing() {
  const spacingEl = document.querySelector('#spacing')
  const rail = page.querySelector('.rail')
  if (!spacingEl || !rail || !lastRun) return

  const visible = [...rail.querySelectorAll('.col')].slice(state.scroll, state.scroll + 3)
  const measured = countReads(() => visible.map((c) => spacingProfile(c)))
  const nat = lastRun.natural
  const pct = (v) => `${v / nat - 1 >= 0 ? '+' : ''}${Math.round((v / nat - 1) * 100)}%`
  const profiles = measured.value
  const rows = profiles
    .map((p, i) => {
      if (!p) return ''
      const spread = p.loosestLine / p.tightestLine - 1
      return `<div class="check-row ${spread < 0.3 ? 'ok' : 'bad'}">
        <span>col ${state.scroll + i + 1} · loosest ${pct(p.loosestLine)}</span>
        <b>${Math.round(spread * 100)}%</b>
      </div>`
    })
    .join('')
  const all = profiles.filter(Boolean)
  const worst = all.length ? Math.max(...all.map((p) => p.loosestLine / p.tightestLine - 1)) : 0
  spacingEl.innerHTML = `
    <div class="check-row"><span>natural space</span><b>${fmt(nat, 2)}px</b></div>
    ${rows}
    <div class="note">Loosest line versus the font's natural space, and the spread between the
    loosest and tightest line in that column — the unevenness the eye catches. Worst on screen
    <b>${Math.round(worst * 100)}%</b>. ${measured.reads} layout reads, diagnostic only.</div>`
}

/* ---------------------------------------------------------------- render */

function render() {
  const [bg, fg, muted] = PALETTES[state.palette]
  const paper = document.querySelector('.paper')
  paper.style.setProperty('--paper-bg', bg)
  paper.style.setProperty('--paper-fg', fg)
  // Supporting text: decks, captions, annotations, rail furniture. Palettes
  // that do not name one get a mix toward the background.
  paper.style.setProperty(
    '--paper-muted',
    muted ?? `color-mix(in srgb, ${fg} 64%, ${bg})`
  )

  const rect = countReads(() => page.getBoundingClientRect())
  const pageW = Math.max(240, rect.value.width)
  const pageH = Math.max(240, rect.value.height)

  const readsBefore = layoutReads
  const t0 = performance.now()
  const result = typeset({
    targetChars: state.targetChars,
    gap: state.gap,
    size: state.size,
    leading: state.leading,
    pageW,
    pageH,
  })
  const ms = performance.now() - t0
  const readsDuringTypeset = layoutReads - readsBefore

  state.scroll = Math.max(0, Math.min(state.scroll, result.columns.length - 1))

  // ---- paint --------------------------------------------------------------
  page.replaceChildren()
  page.style.setProperty('--lh', `${result.lineHeight}px`)
  page.style.setProperty('--fs', `${state.size}px`)
  page.style.setProperty('--wght', String(state.weight))
  page.style.fontFamily = `'${state.face}', ${faceOf(state.face).kind}`

  const m = result.masthead
  const at = (b) => `left:${b.x}px; top:${b.y}px; width:${b.width}px`

  page.append(
    el(
      `<h1 class="headline" style="${at(m.headline)}; font-size:${m.headSize}px; line-height:${m.headLH}px">${HEADLINE}</h1>`
    )
  )
  page.append(
    el(
      `<p class="standfirst" style="${at(m.standfirst)}; font-size:${m.standSize}px; line-height:${m.standLH}px">${STANDFIRST}</p>`
    )
  )
  page.append(
    el(`
    <figure class="quote" style="${at(m.quote)}; --avail:${m.quoteAvail}px">
      <blockquote style="font-size:${m.quoteSize}px; line-height:${m.quoteLH}px">${QUOTE}</blockquote>
      <figcaption>allowed ${Math.round(m.quoteAvail)}px → needed ${m.quoteW}px · ${Math.round(
        m.quoteAvail - m.quoteW
      )}px reclaimed</figcaption>
    </figure>`)
  )

  // ---- the rail -----------------------------------------------------------
  const s = result.strip
  const strip = el(
    `<div class="strip" style="left:${s.x}px; top:${s.y}px; width:${s.width}px; height:${s.height}px"></div>`
  )
  const firstVisible = result.columns[state.scroll]
  const offset = firstVisible ? firstVisible.box.x : 0
  const rail = el(
    `<div class="rail" style="width:${result.railW}px; height:${s.height}px; transform:translateX(${-offset}px)"></div>`
  )

  for (const [i, col] of result.columns.entries()) {
    if (state.showRules) {
      rail.append(
        el(
          `<div class="colbox" style="left:${col.box.x}px; top:0; width:${col.box.width}px; height:${col.box.height}px" data-col="${i + 1}"></div>`
        )
      )
    }
    const box = el(
      `<p class="col ${state.mode}" style="left:${col.box.x}px; top:0; width:${col.box.width}px"></p>`
    )
    box.textContent =
      state.mode === 'ragged' ? col.lines.join('\n') : col.lines.join(' ').replace(/\s+/g, ' ').trim()
    rail.append(box)
  }
  strip.append(rail)
  page.append(strip)

  // ---- rail navigation, in its own row so nothing overlaps the text -------
  const total = result.columns.length
  const nav = el(`
    <div class="railnav" style="left:${result.navBox.x}px; top:${result.navBox.y}px; width:${result.navBox.width}px; height:${result.navBox.height}px">
      <button class="railbtn" data-act="prev" ${state.scroll === 0 ? 'disabled' : ''} aria-label="Previous column">‹</button>
      <div class="railtrack" role="presentation">
        ${result.columns
          .map(
            (_, i) =>
              `<button class="railtick ${i === state.scroll ? 'on' : ''}" data-goto="${i}" aria-label="Column ${i + 1}"></button>`
          )
          .join('')}
      </div>
      <div class="railcount">${state.scroll + 1} / ${total}</div>
      <button class="railbtn" data-act="next" ${
        state.scroll >= total - 1 ? 'disabled' : ''
      } aria-label="Next column">›</button>
    </div>`)
  nav.querySelector('.railtrack').addEventListener('click', (e) => {
    const tick = e.target.closest('[data-goto]')
    if (tick) goToColumn(Number(tick.dataset.goto))
  })
  page.append(nav)

  // Trackpad / shift-wheel moves the rail too.
  strip.addEventListener(
    'wheel',
    (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx) return
      e.preventDefault()
      wheelAccum += dx
      if (Math.abs(wheelAccum) > 90) {
        scrollBy(wheelAccum > 0 ? 1 : -1)
        wheelAccum = 0
      }
    },
    { passive: false }
  )

  // ---- Justif -------------------------------------------------------------
  if (justifController) {
    justifController.destroy()
    justifController = null
  }
  let justifyReads = 0
  let justifyMs = 0
  const skipped = []
  if (state.mode === 'justif') {
    const targets = [...rail.querySelectorAll('.col.justif')]
    const before = layoutReads
    const t = performance.now()
    justifController = justify(targets, {
      hyphenate: hyphenateEnUS,
      observeResize: false, // this page re-typesets on resize itself
      hangingPunctuation: state.hanging === 'none' ? false : state.hanging,
      // Junicode carries a wdth axis, so font expansion is live here — the
      // lever that evens out colour without dumping slack into word spaces.
      hyphenPenalty: 25,
      tracking: { max: 0.035, shrink: 0.035 },
      onSkip: (_p, reason) => {
        const text = String(reason)
        if (!skipped.includes(text)) skipped.push(text)
      },
    })
    justifyMs = performance.now() - t
    justifyReads = layoutReads - before
  }

  lastRun = {
    result,
    ms,
    readsDuringTypeset,
    pageW,
    pageH,
    justifyReads,
    justifyMs,
    skipped,
    natural: naturalSpace(fontString()),
  }
  renderSide()
  updatePager()

  // ---- verification -------------------------------------------------------
  requestAnimationFrame(() => {
    const firstCol = rail.querySelector('.col')
    if (!firstCol) return
    const predicted = result.columns[0].lines.length * result.lineHeight
    const probe = countReads(() => firstCol.getBoundingClientRect().height)

    refreshSpacing()

    const check = document.querySelector('#check')
    if (!check) return
    const delta = Math.abs(probe.value - predicted)
    const actualLines = Math.round(probe.value / result.lineHeight)
    check.innerHTML = `
      <div class="check-row"><span>predicted</span><b>${fmt(predicted, 1)}px</b></div>
      <div class="check-row"><span>measured</span><b>${fmt(probe.value, 1)}px</b></div>
      <div class="check-row ${delta < 1 ? 'ok' : state.mode === 'ragged' ? 'bad' : ''}">
        <span>delta${state.mode !== 'ragged' && delta >= 1 ? ' (re-broken)' : ''}</span>
        <b>${fmt(delta, 2)}px</b>
      </div>
      <div class="note">${probe.reads} layout read — taken only to prove the prediction, never to
      produce it.</div>
      ${
        state.mode !== 'ragged'
          ? `<p class="note">Pretext filled column 1 with <b>${result.columns[0].lines.length}</b> lines;
             after re-breaking it holds <b>${actualLines}</b>.</p>`
          : ''
      }`
  })
}

function updatePager() {
  const label = document.querySelector('#pager-label')
  if (!label || !lastRun) return
  const total = lastRun.result.columns.length
  label.textContent = `col ${Math.min(state.scroll + 1, total)} / ${total}`
}

/* ------------------------------------------------------------------ side */

function renderSide() {
  const { result, ms, readsDuringTypeset, justifyReads, justifyMs, skipped } = lastRun
  const lines = result.columns.reduce((n, c) => n + c.lines.length, 0)

  side.replaceChildren(
    el(`
    <div class="side-inner">
      <section class="hud">
        <div class="hud-row big ${readsDuringTypeset === 0 ? 'zero' : 'bad'}">
          <span>layout reads while typesetting</span><b>${readsDuringTypeset}</b>
        </div>
        <div class="hud-row"><span>typeset time</span><b>${fmt(ms, 2)} ms</b></div>
        <div class="hud-row"><span>prepare() cache</span><b>${prepCache.size} entries · ${fmt(
          prepareMs
        )} ms</b></div>
        <div class="hud-row"><span>measure solved</span><b>${fmt(result.solved.actual, 1)} chars · ${
          result.solved.probes
        } probes</b></div>
        <div class="hud-row"><span>column width</span><b>${Math.round(result.solved.width)}px</b></div>
        <div class="hud-row"><span>columns · lines</span><b>${result.columns.length} · ${lines}</b></div>
        <div class="hud-row"><span>justif</span><b>${
          state.mode === 'justif'
            ? `${fmt(justifyMs)} ms · ${justifyReads} read${justifyReads === 1 ? '' : 's'}`
            : 'off'
        }</b></div>
        ${
          skipped.length
            ? `<div class="hud-row bad"><span>declined</span><b>${esc(skipped[0])}</b></div>`
            : ''
        }
      </section>

      <section class="group">
        <h3>Typeface</h3>
        <select id="face">
          ${FACES.map(
            (f) => `<option value="${f.id}" ${state.face === f.id ? 'selected' : ''}>${f.label}</option>`
          ).join('')}
        </select>
        <p class="note">${esc(faceOf(state.face).axes)}. ${
          faceOf(state.face).wdth
            ? 'Has a <b>wdth</b> axis, so Justif can expand and condense the glyphs to even out colour.'
            : 'No <b>wdth</b> axis, so Justif\'s font expansion is inert here — slack has to land in word spaces and letterfit instead.'
        }</p>
      </section>

      <section class="group">
        <h3>Readability</h3>
        <div class="ctl" data-ctl="targetChars"></div>
        <p class="note">The column width is solved, not set: the page binary-searches the width whose
        average line length is the number you ask for. Below about 40 characters a line holds too few
        word spaces to absorb its slack and justification starts to gap.</p>
      </section>

      <section class="group">
        <h3>Setting</h3>
        <div class="modes">
          ${[
            ['ragged', 'Ragged'],
            ['native', 'Native'],
            ['justif', 'Justif'],
          ]
            .map(([v, l]) => `<button data-mode="${v}" aria-pressed="${state.mode === v}">${l}</button>`)
            .join('')}
        </div>
        <div class="ctl" style="margin-top:12px">
          <div class="ctl-head"><span>Hanging punctuation</span></div>
          <select id="hang" ${state.mode === 'justif' ? '' : 'disabled'}>
            ${[
              ['none', 'none'],
              ['line-end-only', 'line ends only'],
              ['first-line-and-line-ends', 'line ends + first line start'],
              ['all-line-edges', 'all line edges'],
            ]
              .map(
                ([v, l]) => `<option value="${v}" ${state.hanging === v ? 'selected' : ''}>${l}</option>`
              )
              .join('')}
          </select>
        </div>
      </section>

      <section class="group">
        <h3>Word spacing · on screen</h3>
        <div id="spacing"><div class="note">measuring…</div></div>
      </section>

      <section class="group">
        <h3>Prediction check</h3>
        <div id="check"><div class="note">measuring…</div></div>
      </section>

      <section class="group">
        <h3>Type</h3>
        <div class="ctl" data-ctl="size"></div>
        <div class="ctl" data-ctl="leading"></div>
        <div class="ctl" data-ctl="gap"></div>
        <label class="toggle">
          <input type="checkbox" ${state.showRules ? 'checked' : ''} data-act="rules" />
          <span>Show column boxes</span>
        </label>
      </section>

      <section class="group">
        <h3>Palette</h3>
        <div class="swatches"></div>
      </section>

      <section class="group" id="bench-out"></section>

      <section class="group">
        <h3>What you are looking at</h3>
        <p class="note">Pretext measures and allocates, LayoutSans places every box — including the
        rail, which is wider than the page on purpose — and Justif sets the type. Body in
        <b>Junicode</b>, whose <code>wdth</code> axis lets Justif condense and expand the glyphs
        themselves, so slack is absorbed in the letters rather than dumped into the word spaces.
        Arrow keys scroll the rail.</p>
      </section>
    </div>`)
  )

  slider('targetChars', 'Target line length', 28, 100, 1, state.targetChars, 0, ' chars')
  slider('size', 'Font size', 12, 30, 0.5, state.size, 1, 'px')
  slider('leading', 'Leading', 1.1, 2.2, 0.01, state.leading, 2, '×')
  slider('gap', 'Column gap', 12, 90, 1, state.gap, 0, 'px')

  side.querySelector('.modes').addEventListener('click', (e) => {
    const b = e.target.closest('button')
    if (!b) return
    state.mode = b.dataset.mode
    render()
  })
  side.querySelector('#face').addEventListener('change', async (e) => {
    state.face = e.target.value
    // Measuring before the face lands would use fallback metrics.
    await document.fonts.load(`400 ${state.size}px ${state.face}`)
    await document.fonts.load(`600 40px ${state.face}`)
    safeRender()
  })
  side.querySelector('#hang').addEventListener('change', (e) => {
    state.hanging = e.target.value
    render()
  })
  side.querySelector('[data-act="rules"]').addEventListener('change', (e) => {
    state.showRules = e.target.checked
    render()
  })

  const sw = side.querySelector('.swatches')
  PALETTES.forEach(([bg, fg], i) => {
    const b = el(
      `<button class="swatch ${i === state.palette ? 'on' : ''}" style="--sw-bg:${bg};--sw-fg:${fg}" aria-label="palette ${i + 1}"></button>`
    )
    b.addEventListener('click', () => {
      state.palette = i
      render()
    })
    sw.append(b)
  })
}

function slider(key, label, min, max, step, value, decimals, unit = '') {
  const host = side.querySelector(`[data-ctl="${key}"]`)
  if (!host) return
  host.innerHTML = `
    <div class="ctl-head"><span>${label}</span><b>${Number(value.toFixed(decimals))}${unit}</b></div>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" />`
  const input = host.querySelector('input')
  const readout = host.querySelector('b')
  input.addEventListener('input', () => {
    state[key] = input.valueAsNumber
    readout.textContent = `${Number(input.valueAsNumber.toFixed(decimals))}${unit}`
    render()
  })
}

/* --------------------------------------------------------------- actions */

/**
 * Scrolling must NOT re-render: a freshly created element with an inline
 * transform has no previous value to animate from, so the transition never
 * plays. Moving the existing rail is both what makes the spring visible and
 * far cheaper — no re-typesetting, and Justif is not re-run.
 */
function goToColumn(index) {
  if (!lastRun) return
  const total = lastRun.result.columns.length
  const next = Math.max(0, Math.min(total - 1, index))
  if (next === state.scroll) return
  state.scroll = next

  const rail = page.querySelector('.rail')
  const col = lastRun.result.columns[next]
  if (rail && col) rail.style.transform = `translateX(${-col.box.x}px)`

  updateNav()
  updatePager()

  // Re-measure once the columns have actually arrived.
  clearTimeout(spacingTimer)
  spacingTimer = setTimeout(refreshSpacing, 900)
}

const scrollBy = (n) => goToColumn(state.scroll + n)

/** Keeps the rail row in step without rebuilding the page. */
function updateNav() {
  const total = lastRun?.result.columns.length ?? 0
  const nav = page.querySelector('.railnav')
  if (!nav) return
  nav.querySelector('[data-act="prev"]').disabled = state.scroll === 0
  nav.querySelector('[data-act="next"]').disabled = state.scroll >= total - 1
  nav.querySelector('.railcount').textContent = `${state.scroll + 1} / ${total}`
  nav.querySelectorAll('.railtick').forEach((t, i) => t.classList.toggle('on', i === state.scroll))
}

app.addEventListener('click', (e) => {
  const act = e.target.closest('[data-act]')?.dataset.act
  if (!act || !lastRun) return

  if (act === 'prev') scrollBy(-1)
  if (act === 'next') scrollBy(1)

  if (act === 'fit') {
    const { pageW, pageH } = lastRun
    const before = layoutReads
    const { best, candidates, ms } = fitColumn(pageW, pageH)
    const reads = layoutReads - before
    if (best) {
      state.size = best.size
      state.leading = best.leading
      render()
    }
    const out = document.querySelector('#bench-out')
    if (out) {
      out.innerHTML = `
        <h3>Fit column</h3>
        <div class="hud-row"><span>candidate layouts</span><b>${candidates}</b></div>
        <div class="hud-row"><span>search time</span><b>${fmt(ms)} ms</b></div>
        <div class="hud-row ${reads === 0 ? 'zero' : 'bad'}"><span>layout reads</span><b>${reads}</b></div>
        <div class="hud-row"><span>chose</span><b>${
          best ? `${best.size}px · ${fmt(best.leading)}×` : 'none'
        }</b></div>
        <p class="note">Snaps size and leading so whole lines fill the column exactly — ${
          best ? fmt(best.leftover, 1) : '—'
        }px left over at the foot instead of a dangling half line.</p>`
    }
  }

  if (act === 'bench') {
    const width = lastRun.result.solved.width
    const r = benchmark(width)
    document.querySelector('#bench-out').innerHTML = `
      <h3>Same task, two engines</h3>
      <p class="note">Wrapped height of ${r.n} paragraphs at ${Math.round(width)}px.</p>
      <div class="hud-row"><span>Pretext arithmetic</span><b>${fmt(r.pretextMs)} ms</b></div>
      <div class="hud-row"><span>DOM measurement</span><b>${fmt(r.domMs)} ms</b></div>
      <div class="hud-row big"><span>speedup</span><b>${fmt(r.ratio, 1)}×</b></div>
      <p class="note">Totals agree to ${Math.abs(r.h1 - r.h2)}px across ${r.n} paragraphs. The Pretext
      figure excludes prepare(); that cost is paid once per string.</p>`
  }
})

window.addEventListener('keydown', (e) => {
  if (e.target.matches('input, select, textarea')) return
  if (e.key === 'ArrowLeft') scrollBy(-1)
  if (e.key === 'ArrowRight') scrollBy(1)
})

/** A blank page hides the reason; show it instead. */
function safeRender() {
  try {
    render()
  } catch (err) {
    console.error(err)
    page.replaceChildren(el(`<pre class="crash">${esc(String(err.stack || err))}</pre>`))
  }
}

let resizeRaf = null
window.addEventListener('resize', () => {
  if (resizeRaf) cancelAnimationFrame(resizeRaf)
  resizeRaf = requestAnimationFrame(safeRender)
})

/* ------------------------------------------------------------------ boot */

// Fonts first: measuring before they land gives fallback metrics.
await document.fonts.load(`400 ${state.size}px ${state.face}`)
await document.fonts.load(`600 40px ${state.face}`)
await document.fonts.ready
safeRender()
