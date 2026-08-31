/**
 * Pulls the upstream MaaS variable fonts, copies the .woff2 files into
 * public/fonts, and regenerates src/font-data.json by reading the real
 * `fvar`, `GSUB`/`GPOS` and `cmap` tables out of the .ttf binaries.
 *
 *   node scripts/sync-fonts.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cacheDir = path.join(root, '.fonts-src')
const publicDir = path.join(root, 'public/fonts')

const SOURCES = [
  {
    id: 'index',
    repo: 'https://github.com/magicasaservice/index.git',
    dir: 'index',
    name: 'Index',
    blurb: 'Variable duospace typewriter face, rooted in IBM Plex and the iA Writer Duospace concept.',
    license: 'SIL Open Font License 1.1',
    styles: {
      upright: 'Index-Variable',
      italic: 'Index-Variable-Italic',
    },
  },
  {
    id: 'interface',
    repo: 'https://github.com/magicasaservice/interface.git',
    dir: 'interface',
    name: 'Interface',
    blurb: 'Grotesque UI face in the Inter/Haas lineage, with an optical size axis from Text to Display.',
    license: 'MIT',
    styles: {
      upright: 'Interface-Variable',
      italic: 'Interface-VariableItalic',
    },
  },
]

// ---------------------------------------------------------------- sfnt reader

const tag = (buf, off) => buf.toString('latin1', off, off + 4)

function readTables(buf) {
  const tables = {}
  const numTables = buf.readUInt16BE(4)
  for (let i = 0; i < numTables; i++) {
    const off = 12 + i * 16
    tables[tag(buf, off)] = {
      offset: buf.readUInt32BE(off + 8),
      length: buf.readUInt32BE(off + 12),
    }
  }
  return tables
}

function readNames(buf, table) {
  const names = {}
  if (!table) return names
  const n = table.offset
  const count = buf.readUInt16BE(n + 2)
  const strOff = n + buf.readUInt16BE(n + 4)
  for (let i = 0; i < count; i++) {
    const r = n + 6 + i * 12
    const platID = buf.readUInt16BE(r)
    const nameID = buf.readUInt16BE(r + 6)
    const len = buf.readUInt16BE(r + 8)
    const off = buf.readUInt16BE(r + 10)
    if (names[nameID] !== undefined) continue
    names[nameID] =
      platID === 3
        ? Buffer.from(buf.subarray(strOff + off, strOff + off + len)).swap16().toString('utf16le')
        : buf.toString('latin1', strOff + off, strOff + off + len)
  }
  return names
}

function readFvar(buf, table, names) {
  if (!table) return { axes: [], instances: [] }
  const f = table.offset
  const arrayOffset = f + buf.readUInt16BE(f + 4)
  const axisCount = buf.readUInt16BE(f + 8)
  const axisSize = buf.readUInt16BE(f + 10)
  const instanceCount = buf.readUInt16BE(f + 12)
  const instanceSize = buf.readUInt16BE(f + 14)

  const axes = []
  for (let i = 0; i < axisCount; i++) {
    const o = arrayOffset + i * axisSize
    const axisTag = tag(buf, o)
    axes.push({
      tag: axisTag,
      name: names[buf.readUInt16BE(o + 18)] || axisTag,
      min: buf.readInt32BE(o + 4) / 65536,
      default: buf.readInt32BE(o + 8) / 65536,
      max: buf.readInt32BE(o + 12) / 65536,
    })
  }

  const instances = []
  for (let i = 0; i < instanceCount; i++) {
    const o = arrayOffset + axisCount * axisSize + i * instanceSize
    const coords = {}
    for (let a = 0; a < axisCount; a++) {
      coords[axes[a].tag] = buf.readInt32BE(o + 4 + a * 4) / 65536
    }
    instances.push({ name: names[buf.readUInt16BE(o)] || `Instance ${i}`, coords })
  }
  return { axes, instances }
}

function readFeatures(buf, tables) {
  const feats = new Set()
  for (const t of ['GSUB', 'GPOS']) {
    if (!tables[t]) continue
    const g = tables[t].offset
    const list = g + buf.readUInt16BE(g + 6)
    const count = buf.readUInt16BE(list)
    for (let i = 0; i < count; i++) feats.add(tag(buf, list + 2 + i * 6))
  }
  return [...feats].sort()
}

function readCmap(buf, table) {
  const codepoints = new Map()
  if (!table) return codepoints
  const c = table.offset
  const numSubtables = buf.readUInt16BE(c + 2)

  // Prefer a Unicode subtable: (3,10) full repertoire, then (3,1) BMP.
  let best = null
  for (let i = 0; i < numSubtables; i++) {
    const r = c + 4 + i * 8
    const platform = buf.readUInt16BE(r)
    const encoding = buf.readUInt16BE(r + 2)
    const offset = c + buf.readUInt32BE(r + 4)
    const score =
      platform === 3 && encoding === 10 ? 3 : platform === 3 && encoding === 1 ? 2 : platform === 0 ? 1 : 0
    if (score > 0 && (!best || score > best.score)) best = { offset, score }
  }
  if (!best) return codepoints

  const format = buf.readUInt16BE(best.offset)
  if (format === 4) {
    const t = best.offset
    const segCountX2 = buf.readUInt16BE(t + 6)
    const segCount = segCountX2 / 2
    const endBase = t + 14
    const startBase = endBase + segCountX2 + 2
    const deltaBase = startBase + segCountX2
    const rangeBase = deltaBase + segCountX2
    for (let s = 0; s < segCount; s++) {
      const end = buf.readUInt16BE(endBase + s * 2)
      const start = buf.readUInt16BE(startBase + s * 2)
      if (start === 0xffff) continue
      const delta = buf.readInt16BE(deltaBase + s * 2)
      const rangeOffset = buf.readUInt16BE(rangeBase + s * 2)
      for (let cp = start; cp <= end && cp !== 0xffff; cp++) {
        let glyph
        if (rangeOffset === 0) {
          glyph = (cp + delta) & 0xffff
        } else {
          const gi = rangeBase + s * 2 + rangeOffset + (cp - start) * 2
          if (gi + 1 >= buf.length) continue
          glyph = buf.readUInt16BE(gi)
          if (glyph !== 0) glyph = (glyph + delta) & 0xffff
        }
        if (glyph !== 0) codepoints.set(cp, glyph)
      }
    }
  } else if (format === 12) {
    const t = best.offset
    const nGroups = buf.readUInt32BE(t + 12)
    for (let g = 0; g < nGroups; g++) {
      const o = t + 16 + g * 12
      const start = buf.readUInt32BE(o)
      const end = buf.readUInt32BE(o + 4)
      const startGid = buf.readUInt32BE(o + 8)
      for (let cp = start; cp <= end; cp++) codepoints.set(cp, startGid + (cp - start))
    }
  }
  return codepoints
}

/* ------------------------------------------------------- GSUB / advances */

function readCoverage(buf, off) {
  const fmt = buf.readUInt16BE(off)
  const out = []
  const n = buf.readUInt16BE(off + 2)
  if (fmt === 1) {
    for (let i = 0; i < n; i++) out.push(buf.readUInt16BE(off + 4 + i * 2))
  } else if (fmt === 2) {
    for (let i = 0; i < n; i++) {
      const r = off + 4 + i * 6
      for (let g = buf.readUInt16BE(r); g <= buf.readUInt16BE(r + 2); g++) out.push(g)
    }
  }
  return out
}

/** Single (type 1) and alternate (type 3) substitutions, following extensions. */
function readSubstitutions(buf, type, off, out = []) {
  if (type === 7) {
    return readSubstitutions(buf, buf.readUInt16BE(off + 2), off + buf.readUInt32BE(off + 4), out)
  }
  if (type === 1) {
    const fmt = buf.readUInt16BE(off)
    const cov = readCoverage(buf, off + buf.readUInt16BE(off + 2))
    if (fmt === 1) {
      const delta = buf.readInt16BE(off + 4)
      cov.forEach((g) => out.push([g, (g + delta) & 0xffff]))
    } else {
      cov.forEach((g, i) => out.push([g, buf.readUInt16BE(off + 6 + i * 2)]))
    }
  }
  if (type === 3) {
    const cov = readCoverage(buf, off + buf.readUInt16BE(off + 2))
    const n = buf.readUInt16BE(off + 4)
    for (let i = 0; i < n && i < cov.length; i++) {
      const setOff = off + buf.readUInt16BE(off + 6 + i * 2)
      // `aalt`-style features list several alternates; the first is what the
      // shaper picks, so that is the one worth modelling.
      if (buf.readUInt16BE(setOff) > 0) out.push([cov[i], buf.readUInt16BE(setOff + 2)])
    }
  }
  return out
}

function featureSubstitutions(buf, tables) {
  const map = new Map()
  if (!tables.GSUB) return map
  const G = tables.GSUB.offset
  const featureList = G + buf.readUInt16BE(G + 6)
  const lookupList = G + buf.readUInt16BE(G + 8)

  const lookups = []
  const lookupCount = buf.readUInt16BE(lookupList)
  for (let i = 0; i < lookupCount; i++) lookups.push(lookupList + buf.readUInt16BE(lookupList + 2 + i * 2))

  const subsOf = (li) => {
    const off = lookups[li]
    const type = buf.readUInt16BE(off)
    const out = []
    const nSub = buf.readUInt16BE(off + 4)
    for (let s = 0; s < nSub; s++) readSubstitutions(buf, type, off + buf.readUInt16BE(off + 6 + s * 2), out)
    return out
  }

  const featureCount = buf.readUInt16BE(featureList)
  for (let i = 0; i < featureCount; i++) {
    const rec = featureList + 2 + i * 6
    const ftag = tag(buf, rec)
    const fOff = featureList + buf.readUInt16BE(rec + 4)
    const subs = map.get(ftag) || []
    const nLookups = buf.readUInt16BE(fOff + 2)
    for (let l = 0; l < nLookups; l++) subs.push(...subsOf(buf.readUInt16BE(fOff + 4 + l * 2)))
    map.set(ftag, subs)
  }
  return map
}

/**
 * Looks for a feature that turns the face monospaced — one whose substitutions
 * pull outlying advances onto the modal one. Index ships exactly this as ss01
 * (m, w, M, W, @ and friends drop from 0.9em to 0.6em); most faces have none.
 */
function findMonoFeature(buf, tables, cmap) {
  if (!tables.hmtx || !tables.hhea || !tables.head) return null
  const unitsPerEm = buf.readUInt16BE(tables.head.offset + 18)
  const numHMetrics = buf.readUInt16BE(tables.hhea.offset + 34)
  const advance = (gid) =>
    buf.readUInt16BE(tables.hmtx.offset + Math.min(gid, numHMetrics - 1) * 4)

  const ascii = []
  for (let cp = 0x21; cp <= 0x7e; cp++) {
    const gid = cmap.get(cp)
    if (gid) ascii.push({ ch: String.fromCodePoint(cp), gid })
  }
  if (ascii.length < 50) return null

  const shareOf = (gids) => {
    const counts = new Map()
    for (const g of gids) counts.set(advance(g), (counts.get(advance(g)) || 0) + 1)
    let width = 0
    let best = 0
    for (const [w, n] of counts) if (n > best) [best, width] = [n, w]
    return { share: best / gids.length, width }
  }

  const base = shareOf(ascii.map((a) => a.gid))
  if (base.share >= 0.98) return null // already monospaced, no switch needed

  const candidates = []
  for (const [ftag, subs] of featureSubstitutions(buf, tables)) {
    // `aalt` reaches every alternate in the font, so it monospaces the face as
    // a side effect while also swapping a->ª and friends. Never the switch.
    if (!subs.length || ftag === 'aalt') continue
    const sub = new Map(subs)
    const after = shareOf(ascii.map((a) => sub.get(a.gid) ?? a.gid))
    if (after.share < 0.98 || after.share <= base.share) continue

    const chars = ascii
      .filter((a) => sub.has(a.gid) && advance(sub.get(a.gid)) !== advance(a.gid))
      .map((a) => a.ch)
    if (!chars.length) continue

    candidates.push({
      tag: ftag,
      chars,
      total: subs.length,
      from: Math.round((advance(cmap.get(chars[0].codePointAt(0))) / unitsPerEm) * 1000) / 1000,
      to: Math.round((after.width / unitsPerEm) * 1000) / 1000,
      share: Math.round(after.share * 1000) / 10,
    })
  }

  // The most targeted feature that does the job is the intended switch.
  candidates.sort((a, b) => a.total - b.total)
  return candidates[0] || null
}

function inspect(file) {
  const buf = fs.readFileSync(file)
  const tables = readTables(buf)
  const names = readNames(buf, tables.name)
  const { axes, instances } = readFvar(buf, tables.fvar, names)
  const cmap = readCmap(buf, tables.cmap)
  return {
    version: (names[5] || '').replace(/^Version\s*/, '').split(';')[0],
    axes,
    instances,
    features: readFeatures(buf, tables),
    monoFeature: findMonoFeature(buf, tables, cmap),
    codepoints: [...cmap.keys()].sort((a, b) => a - b),
  }
}

// ---------------------------------------------------------------------- sync

fs.mkdirSync(cacheDir, { recursive: true })
fs.mkdirSync(publicDir, { recursive: true })

const families = []

for (const src of SOURCES) {
  const dest = path.join(cacheDir, src.dir)
  if (fs.existsSync(path.join(dest, '.git'))) {
    console.log(`· updating ${src.dir}`)
    execFileSync('git', ['-C', dest, 'pull', '--ff-only', '--depth', '1'], { stdio: 'inherit' })
  } else {
    console.log(`· cloning ${src.dir}`)
    execFileSync('git', ['clone', '--depth', '1', src.repo, dest], { stdio: 'inherit' })
  }

  const styles = {}
  for (const [style, base] of Object.entries(src.styles)) {
    const ttf = path.join(dest, 'dist', `${base}.ttf`)
    const woff2 = path.join(dest, 'dist', `${base}.woff2`)
    fs.copyFileSync(woff2, path.join(publicDir, `${base}.woff2`))
    styles[style] = { file: `/fonts/${base}.woff2`, ...inspect(ttf) }
    console.log(`  ${base}: ${styles[style].axes.map((a) => a.tag).join(', ')}`)
  }

  for (const [name, file] of [['LICENSE', `LICENSE-${src.name}.txt`]]) {
    fs.copyFileSync(path.join(dest, fs.existsSync(path.join(dest, name)) ? name : 'LICENSE'), path.join(publicDir, file))
  }

  families.push({
    id: src.id,
    name: src.name,
    blurb: src.blurb,
    license: src.license,
    repo: src.repo.replace(/\.git$/, ''),
    styles,
  })
}

const out = path.join(root, 'src/font-data.json')
fs.writeFileSync(out, JSON.stringify({ families }, null, 2) + '\n')
console.log(`\nwrote ${path.relative(root, out)}`)
