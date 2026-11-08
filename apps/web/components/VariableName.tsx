'use client';

/** @label "Variable Name" */
/** @comment "Variable-font wordmark with three effects. Sunset bloom: copies of the word stack on top of each other, each in its own sunset colour. Inward (default): each arrives bold on the outside and thins toward the centre, so the name seems to keep sinking into itself. Outward: each is born skinny on top and grows bold. Heartbeat: the whole word rests at base weight and spikes to peak twice (lub-dub). Still: base weight. Optionally pointer-reactive in heartbeat mode. Fits itself to the width of whatever box it sits in, so it never overflows a phone. Ported from the type experiments' proximity view." */
/** @controls {
  "text": { "type": "text", "label": "Text", "default": "Ted Dessert" },
  "effect": { "type": "select", "label": "Effect", "default": "heartbeat", "options": [{"label":"Sunset bloom","value":"bloom"},{"label":"Sunset heartbeat","value":"sunset-heartbeat"},{"label":"Heartbeat","value":"heartbeat"},{"label":"Still","value":"still"}] },
  "beatPush": { "type": "slider", "label": "Heartbeat push", "default": 0, "min": 0, "max": 0.5, "step": 0.01, "description": "Sunset heartbeat: optionally also shove the rings inward on each lub-dub, as a share of one ring's life. The beat itself already reveals and hides the outer rings." },
  "bloomDirection": { "type": "select", "label": "Bloom direction", "default": "inward", "options": [{"label":"Inward (bold to skinny)","value":"inward"},{"label":"Outward (skinny to bold)","value":"outward"}] },
  "bloomSeconds": { "type": "slider", "label": "Bloom length (s)", "default": 24, "min": 2, "max": 90, "step": 1, "description": "How long one layer takes to cross from skinny to bold. A new layer starts every length ÷ layers." },
  "bloomLayers": { "type": "slider", "label": "Bloom layers", "default": 40, "min": 4, "max": 120, "step": 1, "description": "More layers make finer rings." },
  "colourSpread": { "type": "slider", "label": "Colours at once", "default": 0.15, "min": 0.02, "max": 1, "step": 0.01, "description": "How much of the sunset is on screen at one time. Low shows two or three neighbouring colours that drift through the whole sunset; 1 shows every colour at once." },
  "bloomFromWeight": { "type": "slider", "label": "Bloom start weight", "default": 100, "min": 100, "max": 700, "step": 10 },
  "color1": { "type": "color", "label": "Sunset stop 1", "default": "#FFC04D" },
  "color2": { "type": "color", "label": "Sunset stop 2", "default": "#FFB07C" },
  "color3": { "type": "color", "label": "Sunset stop 3", "default": "#FF6F61" },
  "color4": { "type": "color", "label": "Sunset stop 4", "default": "#FF4F81" },
  "color5": { "type": "color", "label": "Sunset stop 5", "default": "#9A5DBF" },
  "color6": { "type": "color", "label": "Sunset stop 6", "default": "#8CC8F0" },
  "color7": { "type": "color", "label": "Sunset stop 7", "default": "#4C7BD0" },
  "baseWeight": { "type": "slider", "label": "Base weight", "default": 300, "min": 100, "max": 700, "step": 10 },
  "peakWeight": { "type": "slider", "label": "Peak weight", "default": 700, "min": 100, "max": 700, "step": 10 },
  "radius": { "type": "slider", "label": "Radius (px)", "default": 180, "min": 40, "max": 600, "step": 10 },
  "fontSize": { "type": "slider", "label": "Font size (px)", "default": 84, "min": 24, "max": 240, "step": 2 },
  "fit": { "type": "toggle", "label": "Fit to width", "default": true, "description": "Shrink below Font size when the box is narrower than the text. Font size becomes the maximum." },
  "minFontSize": { "type": "slider", "label": "Min font size (px)", "default": 20, "min": 8, "max": 120, "step": 1 },
  "color": { "type": "color", "label": "Color", "default": "#222017" },
  "pulseColor": { "type": "color", "label": "Pulse colour", "default": "#64635D", "description": "Heartbeat: the colour the name eases toward at full bold. Default is the ink a touch lighter." },
  "pulseColorCurve": { "type": "slider", "label": "Pulse colour curve", "default": 1, "min": 0.2, "max": 3, "step": 0.05, "description": "Below 1 the red arrives early and lingers as the weight falls; above 1 it only shows near the peak." },
  "idleWave": { "type": "toggle", "label": "Animate", "default": true, "description": "Off holds the chosen effect still." },
  "beatDirection": { "type": "select", "label": "Beat direction", "default": "swell", "options": [{"label":"Swell (rest skinny, beat bold)","value":"swell"},{"label":"Squeeze (rest bold, beat skinny)","value":"squeeze"}] },
  "pulseSeconds": { "type": "slider", "label": "Beat every (s)", "default": 3, "min": 0.6, "max": 10, "step": 0.1, "description": "Time from the start of one lub-dub to the start of the next." },
  "pointerReactive": { "type": "toggle", "label": "Pointer reactive", "default": false, "description": "Heartbeat only: letters near the cursor get bolder. Off keeps the weight even across the word." }
} */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { withResponsiveProps } from '@revyme/runtime';

// The Index variable face (wght 100–700) travels with the project as a real
// asset file; the component owns its own @font-face so no managed CSS file
// needs editing. /assets/* resolves identically in canvas, preview and prod.
const FONT_CSS = `
@font-face {
  font-family: 'Index Variable';
  src: url('/assets/fonts/Index-Variable.woff2') format('woff2');
  font-weight: 100 700;
  font-style: normal;
  font-display: block;
}`;

// Pre-hydration floor. Server HTML carries no measurement, so until the JS
// arrives (seconds on cellular) the size is a CSS expression that cannot
// overflow: the design size, capped so the row is at most ~80% of the
// viewport assuming a 0.6em monospace advance. The measured fit replaces it
// before first paint on any client that runs the effect below. Index's true
// advance is 0.58em and does not change with weight (588.05px at wght 100 and
// 700 alike, measured), so the fit needs no safety margin.
const FLOOR_VIEWPORT_SHARE = 0.8;
const FLOOR_ADVANCE_EM = 0.6;

// Fit the font size to the wrapper's width. The row's width per 1px of
// font-size is size-invariant, so one measurement at ANY current size gives
// the exact size that fills the box; re-applying that size measures back to
// the same number, which makes the loop a fixed point rather than a chase.
// Re-measures when the wrapper resizes and when fonts finish loading (the
// fallback mono has a different advance than Index). Deliberately does NOT
// observe the row itself: the weight animation would fire it every frame.
// Returns null until measured; null on the server, which keeps hydration
// byte-identical.
function useFitFontSize(
  wrapRef: React.RefObject<HTMLDivElement | null>,
  rowRef: React.RefObject<HTMLSpanElement | null>,
  enabled: boolean,
  designPx: number,
  minPx: number,
  text: string,
): number | null {
  const [fitPx, setFitPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!enabled) {
      setFitPx(null);
      return;
    }
    const wrap = wrapRef.current;
    const row = rowRef.current;
    if (!wrap || !row) return;

    let frame = 0;
    const measure = () => {
      // Both in layout px. clientWidth ignores ancestor transforms but
      // getBoundingClientRect does not, and on the canvas every artboard sits
      // under the zoom transform: a 588px row reported 250px at 43% zoom, the
      // ratio came out 2.4× too small, and the fit solved to a size above the
      // cap on every tile. offsetWidth is in the same space as clientWidth.
      const avail = wrap.clientWidth;
      const rowW = row.offsetWidth;
      const first = row.firstElementChild as HTMLElement | null;
      const cur = first ? parseFloat(getComputedStyle(first).fontSize) : 0;
      if (!avail || !rowW || !cur) return;
      const perPx = rowW / cur;
      // Floor to 0.1px so rounding can never land a hair over the box.
      const exact = Math.floor((avail / perPx) * 10) / 10;
      const next = Math.max(minPx, Math.min(designPx, exact));
      setFitPx((prev) => (prev !== null && Math.abs(prev - next) < 0.25 ? prev : next));
    };

    measure();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(wrap);
    const fonts = typeof document !== 'undefined' ? document.fonts : undefined;
    fonts?.ready.then(measure);
    fonts?.addEventListener?.('loadingdone', measure);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      fonts?.removeEventListener?.('loadingdone', measure);
    };
  }, [wrapRef, rowRef, enabled, designPx, minPx, text]);

  return fitPx;
}

// One heartbeat, in seconds since it began → 0..1. Two pulses like a real
// heart, and they are not equal: the lub (S1, the valves closing as the heart
// contracts) is the louder, longer one, so it goes all the way to peak weight
// and falls back a little slower; the dub (S2) about a quarter second later is
// shorter and only gets a bit over half as bold. The whole beat fits in
// BEAT_WINDOW; a heartbeat starts every pulseSeconds, and the rest of that time
// the name rests skinny.
const LUB_AT = 0.07;
const DUB_AT = 0.32;
const DUB_STRENGTH = 0.55;
const ATTACK = 0.03;
const LUB_DECAY = 0.07;
const DUB_DECAY = 0.045;
const BEAT_WINDOW = 0.55;

function pulseAt(x: number, decay: number): number {
  return x < 0 ? Math.exp(-((x / ATTACK) ** 2)) : Math.exp(-((x / decay) ** 1.6));
}

// How far through one heartbeat's push the rings are, seconds → 0..1. Two soft
// steps at the lub and the dub (the dub smaller), so the rings lurch forward
// twice per beat and coast the rest of the time.
function beatSurge(seconds: number, period: number): number {
  const step = (x: number, w: number) => 1 / (1 + Math.exp(-x / w));
  const f = (t: number) => step(t - LUB_AT, 0.025) + DUB_STRENGTH * step(t - DUB_AT, 0.02);
  const lo = f(0);
  const hi = f(period);
  return (f(Math.min(seconds, period)) - lo) / Math.max(1e-6, hi - lo);
}

// A ring is fully visible at or below the cap and fades out over the next
// RING_EDGE weight units above it, so the edge of the beat is soft.
const RING_EDGE = 40;

function ringReveal(weight: number, cap: number): number {
  return Math.max(0, Math.min(1, 1 - (weight - cap) / RING_EDGE));
}

function heartbeat(seconds: number): number {
  return Math.min(1, Math.max(pulseAt(seconds - LUB_AT, LUB_DECAY), DUB_STRENGTH * pulseAt(seconds - DUB_AT, DUB_DECAY)));
}

// Sunset bloom: a layer's life, p in [0, 1). Weight moves at an even speed,
// so the rings stay evenly spaced and the motion reads as one steady zoom. A
// layer fades in over its first slot and out over its last (a slot is 1/n of
// the cycle), so no ring ever pops at either the centre or the edge.
function bloomGrowth(p: number): number {
  return p;
}

function bloomOpacity(p: number, layers: number): number {
  return Math.max(0, Math.min(1, p * layers, (1 - p) * layers));
}

// The layer colours. The stops (horizon gold up to the blue overhead) are
// walked there and back (1 → 7 → 1) so the loop is seamless. A layer takes its
// colour from where the sunset is at the moment it is born, and the sunset
// moves slower than the layers do, so only a narrow band of neighbouring
// colours is on screen at once and the name drifts through the whole sunset.
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
  const n = parseInt(full, 16);
  return Number.isNaN(n) ? [0, 0, 0] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function sunsetPath(stops: string[]): [number, number, number][] {
  return [...stops, ...stops.slice(1, -1).reverse()].map(hexToRgb);
}

function sunsetAt(path: [number, number, number][], x: number): string {
  const t = ((x % 1) + 1) % 1;
  const pos = t * path.length;
  const i = Math.floor(pos);
  const f = pos - i;
  const a = path[i % path.length];
  const b = path[(i + 1) % path.length];
  const c = a.map((v, j) => Math.round(v + (b[j] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

// Slot k of n at a given point in the cycle: its life p in [0, 1), and the
// moment it was born (unique per birth, 1/n apart), which picks its colour.
function bloomSlot(cycle: number, k: number, n: number): { p: number; born: number } {
  const q = cycle - k / n;
  const born = Math.floor(q) + k / n;
  return { p: q - Math.floor(q), born };
}

function VariableName({
  text = 'Ted Dessert',
  effect = 'heartbeat',
  bloomDirection = 'inward',
  beatPush = 0,
  bloomSeconds = 24,
  bloomFromWeight = 100,
  bloomLayers = 40,
  colourSpread = 0.15,
  color1 = '#FFC04D',
  color2 = '#FFB07C',
  color3 = '#FF6F61',
  color4 = '#FF4F81',
  color5 = '#9A5DBF',
  color6 = '#8CC8F0',
  color7 = '#4C7BD0',
  baseWeight = 300,
  peakWeight = 700,
  radius = 180,
  fontSize = 84,
  fit = true,
  minFontSize = 20,
  color = '#222017',
  idleWave = true,
  beatDirection = 'swell',
  pulseSeconds = 3,
  pointerReactive = false,
  pulseColor = '#64635D',
  pulseColorCurve = 1,
  ...props
}: {
  text?: string;
  effect?: 'bloom' | 'heartbeat' | 'still' | string;
  bloomDirection?: 'inward' | 'outward' | string;
  beatPush?: number;
  bloomSeconds?: number;
  bloomFromWeight?: number;
  bloomLayers?: number;
  colourSpread?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  color6?: string;
  color7?: string;
  baseWeight?: number;
  peakWeight?: number;
  radius?: number;
  fontSize?: number;
  fit?: boolean;
  minFontSize?: number;
  color?: string;
  idleWave?: boolean;
  beatDirection?: 'squeeze' | 'swell' | string;
  pulseSeconds?: number;
  pointerReactive?: boolean;
  pulseColor?: string;
  pulseColorCurve?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLSpanElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const weights = useRef<number[]>([]);
  const raf = useRef<number>(0);
  const layerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const chars = Array.from(text);
  const bloom = effect === 'bloom' || effect === 'sunset-heartbeat';
  const beating = effect === 'sunset-heartbeat';
  const sunset = sunsetPath([color1, color2, color3, color4, color5, color6, color7]);
  const layerCount = Math.max(2, Math.round(bloomLayers));
  const slots = Array.from({ length: layerCount }, (_, k) => k);

  const fitPx = useFitFontSize(wrapRef, rowRef, fit, fontSize, minFontSize, text);
  const floorVw = ((FLOOR_VIEWPORT_SHARE * 100) / (Math.max(1, chars.length) * FLOOR_ADVANCE_EM)).toFixed(2);
  const appliedFontSize = !fit
    ? `${fontSize}px`
    : fitPx !== null
      ? `${fitPx}px`
      : `min(${fontSize}px, ${floorVw}vw)`;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    weights.current = chars.map(() => baseWeight);
    const spans = charRefs.current.slice(0, chars.length);

    if (bloom) {
      const layers = layerRefs.current.slice(0, layerCount);
      const n = layers.length;
      // Each layer is a fixed slot in the cycle, 1/n apart, so the stack is
      // already full on the first frame. Newest (skinniest) sits on top.
      const squeezeBeat = beatDirection === 'squeeze';
      const heartbeatCap = (seconds: number) => {
        const h = heartbeat(seconds);
        return squeezeBeat ? peakWeight - (peakWeight - baseWeight) * h : baseWeight + (peakWeight - baseWeight) * h;
      };
      // cap: in sunset heartbeat, only rings at or below this weight show. It
      // follows the heartbeat, so at rest the name is just its thin inner
      // rings and each beat flashes the bolder outer rings into view.
      const paint = (cycle: number, cap = Infinity) => {
        for (let k = 0; k < n; k++) {
          const s = layers[k];
          if (!s) continue;
          const { p, born } = bloomSlot(cycle, k, n);
          s.style.color = sunsetAt(sunset, born * colourSpread);
          const w = bloomFromWeight + (peakWeight - bloomFromWeight) * bloomGrowth(p);
          s.style.fontVariationSettings = `'wght' ${Math.round(w)}`;
          s.style.opacity = String(bloomOpacity(p, n) * ringReveal(w, cap));
          s.style.zIndex = String(Math.round((1 - p) * 1000));
        }
      };
      if (reduced || !idleWave) {
        paint(0.5 / n, beating ? heartbeatCap(0) : Infinity);
        return;
      }
      // Inward plays the same cycle backwards: each layer arrives bold on the
      // outside, thins as it sinks toward the centre, and dissolves there.
      const direction = bloomDirection === 'outward' ? 1 : -1;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = (now - start) / 1000;
        let travel = elapsed / Math.max(0.5, bloomSeconds);
        let cap = Infinity;
        if (beating) {
          const period = Math.max(BEAT_WINDOW, pulseSeconds);
          const beats = Math.floor(elapsed / period);
          const inBeat = elapsed - beats * period;
          cap = heartbeatCap(inBeat);
          // Optional extra: each heartbeat also shoves the rings inward.
          travel += Math.max(0, beatPush) * (beats + beatSurge(inBeat, period));
        }
        paint((0.5 / n) + direction * travel, cap);
        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf.current);
    }

    if (reduced || effect === 'still') {
      spans.forEach((s) => {
        if (s) s.style.fontVariationSettings = `'wght' ${Math.round(baseWeight)}`;
      });
      return;
    }

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      pointer.current = null;
    };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    const squeeze = beatDirection === 'squeeze';
    const restRgb = hexToRgb(color);
    const flushRgb = hexToRgb(pulseColor);
    const start = performance.now();
    const tick = (now: number) => {
      const wrapRect = wrap.getBoundingClientRect();
      // One phase for the whole word, so every letter beats together.
      const period = Math.max(BEAT_WINDOW, pulseSeconds);
      const pulse = heartbeat(((now - start) / 1000) % period);
      const following = pointerReactive && pointer.current !== null;
      for (let i = 0; i < spans.length; i++) {
        const s = spans[i];
        if (!s) continue;
        // Swell rests at base weight and beats toward peak; squeeze is the
        // other way round, like a heart contracting on the beat.
        const restWeight = squeeze ? peakWeight : baseWeight;
        const beatWeight = squeeze ? baseWeight : peakWeight;
        let target = restWeight;
        if (following && pointer.current) {
          // Gaussian falloff on pointer distance — the experiments' curve.
          const cr = s.getBoundingClientRect();
          const cx = cr.left - wrapRect.left + cr.width / 2;
          const cy = cr.top - wrapRect.top + cr.height / 2;
          const d = Math.hypot(cx - pointer.current.x, cy - pointer.current.y);
          const t = d / Math.max(1, radius);
          target = baseWeight + (peakWeight - baseWeight) * Math.exp(-4 * t * t);
        } else if (idleWave) {
          target = restWeight + (beatWeight - restWeight) * pulse;
        }
        // Ease toward the pointer target so it feels damped, not twitchy. The
        // heartbeat is applied as is: easing would blunt its sharp beats.
        const next = following ? weights.current[i] + (target - weights.current[i]) * 0.18 : target;
        weights.current[i] = next;
        s.style.fontVariationSettings = `'wght' ${Math.round(next)}`;
        // Ease toward the pulse colour by how far into the beat the letter is.
        const f = Math.max(0, Math.min(1, Math.abs(next - restWeight) / Math.max(1, Math.abs(peakWeight - baseWeight))));
        const m = f ** Math.max(0.05, pulseColorCurve);
        s.style.color = `rgb(${restRgb.map((v, j) => Math.round(v + (flushRgb[j] - v) * m)).join(', ')})`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
    // Re-arm when any tuning knob changes.
  }, [text, effect, bloomDirection, bloomSeconds, bloomLayers, colourSpread, color1, color2, color3, color4, color5, color6, color7, bloomFromWeight, baseWeight, peakWeight, radius, idleWave, pulseSeconds, pointerReactive, color, pulseColor, pulseColorCurve, beatDirection, beatPush]);

  return (
    // `block`, not `inline-block`: the wrapper must take the width of its
    // container rather than hug the text, because that width IS the fit
    // target. As a flex item it was already blockified on the live page; on
    // the canvas it sits inside a plain block host and would otherwise hug.
    <div
      data-id={props['data-id']}
      data-name={props['data-name']}
      ref={wrapRef}
      aria-label={text}
      role="heading"
      aria-level={1}
      style={{ position: 'relative', display: 'block', cursor: 'default', ...props.style }}
    >
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      {/* In bloom mode the per-character row stays in flow, invisible, as the
          sizing reference the fit measures; the coloured layers sit on top of
          it. Index's advance is the same at every weight, so the layers line
          up letter for letter however bold each one is. */}
      <span
        ref={rowRef}
        aria-hidden="true"
        style={{ display: 'inline-block', whiteSpace: 'pre', visibility: bloom ? 'hidden' : 'visible' }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              fontFamily: "'Index Variable', ui-monospace, monospace",
              fontSize: appliedFontSize,
              lineHeight: 1.1,
              color,
              fontVariationSettings: `'wght' ${baseWeight}`,
            }}
          >
            {ch}
          </span>
        ))}
      </span>
      {bloom &&
        slots.map((k) => {
          // Server and first paint show the still frame the effect would hold.
          const { p: p0, born } = bloomSlot(0.5 / layerCount, k, layerCount);
          return (
          <span
            key={k}
            aria-hidden="true"
            ref={(el) => {
              layerRefs.current[k] = el;
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              display: 'inline-block',
              whiteSpace: 'pre',
              fontFamily: "'Index Variable', ui-monospace, monospace",
              fontSize: appliedFontSize,
              lineHeight: 1.1,
              color: sunsetAt(sunset, born * colourSpread),
              fontVariationSettings: `'wght' ${Math.round(bloomFromWeight + (peakWeight - bloomFromWeight) * bloomGrowth(p0))}`,
              opacity: bloomOpacity(p0, layerCount) * (beating ? ringReveal(bloomFromWeight + (peakWeight - bloomFromWeight) * bloomGrowth(p0), beatDirection === 'squeeze' ? peakWeight : baseWeight) : 1),
              zIndex: Math.round((1 - p0) * 1000),
            }}
          >
            {text}
          </span>
          );
        })}
    </div>
  );
}

export default withResponsiveProps(VariableName);
