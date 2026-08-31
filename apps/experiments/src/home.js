import './shell.css'
import './home.css'
import { PALETTES } from './palettes.js'

const EXPERIMENTS = [
  {
    href: '/type-tester.html',
    index: '01',
    title: 'Variable type tester',
    blurb:
      'Play with the MaaS Index and Interface variable typefaces. Every control is generated from the font binaries — axes, named instances, OpenType features and the glyph inventory come straight out of fvar, GSUB and cmap.',
    tags: ['variable fonts', 'opentype', 'specimen'],
    palette: PALETTES[0],
    sample: 'Brick',
    font: "'Interface'",
    fvs: "'opsz' 32, 'wght' 780",
  },
  {
    href: '/flow.html',
    index: '02',
    title: 'The flow',
    blurb:
      'A magazine spread that re-typesets itself. Pretext predicts where every line breaks without touching the DOM, LayoutSans computes the column geometry, and the page searches hundreds of candidate layouts to find the one that fits.',
    tags: ['pretext', 'layout-sans', 'zero reflow'],
    palette: PALETTES[3],
    sample: 'Flow',
    font: "'Index'",
    fvs: "'wght' 500",
  },
  {
    // The site is its own workspace on its own port, so in dev this points at
    // that server; a build lands both under one origin.
    href: import.meta.env.DEV ? 'http://localhost:5173' : '/site/',
    index: '03',
    title: 'Ted Dessert',
    blurb:
      'The portfolio itself. React 19 on the astryx design system, with the content model still living as hardcoded arrays in App.tsx — the thing a CMS would take over.',
    tags: ['portfolio', 'react', 'design system'],
    palette: ['#f6f0e5', '#4a6c56'],
    sample: 'Ted',
    font: "'Interface'",
    fvs: "'opsz' 32, 'wght' 620",
    external: true,
  },
]

const el = (html) => {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild
}

const root = document.querySelector('#home')

root.append(
  el(`
  <header class="home-head">
    <div class="home-title">Experiments</div>
    <div class="home-sub">Type, layout, and measurement.</div>
  </header>`)
)

const grid = el('<div class="cards"></div>')
for (const x of EXPERIMENTS) {
  const card = el(`
    <a class="card" href="${x.href}" style="--bg:${x.palette[0]}; --fg:${x.palette[1]}">
      <div class="card-art" aria-hidden="true">
        <span style="font-family:${x.font}; font-variation-settings:${x.fvs}">${x.sample}</span>
      </div>
      <div class="card-body">
        <div class="card-index">${x.index}${
          x.external ? '<span class="card-ext" title="separate app">↗</span>' : ''
        }</div>
        <h2 class="card-title">${x.title}</h2>
        <p class="card-blurb">${x.blurb}</p>
        <div class="card-tags">${x.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>
    </a>`)
  grid.append(card)
}
root.append(grid)
