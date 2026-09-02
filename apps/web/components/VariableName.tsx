'use client';

/** @label "Variable Name" */
/** @comment "Pointer-reactive variable-font wordmark: the character nearest the cursor peaks in weight, neighbours decay on a gaussian. Idles on a slow weight wave. Fits itself to the width of whatever box it sits in, so it never overflows a phone. Ported from the type experiments' proximity view." */
/** @controls {
  "text": { "type": "text", "label": "Text", "default": "Ted Dessert" },
  "baseWeight": { "type": "slider", "label": "Base weight", "default": 300, "min": 100, "max": 700, "step": 10 },
  "peakWeight": { "type": "slider", "label": "Peak weight", "default": 700, "min": 100, "max": 700, "step": 10 },
  "radius": { "type": "slider", "label": "Radius (px)", "default": 180, "min": 40, "max": 600, "step": 10 },
  "fontSize": { "type": "slider", "label": "Font size (px)", "default": 84, "min": 24, "max": 240, "step": 2 },
  "fit": { "type": "toggle", "label": "Fit to width", "default": true, "description": "Shrink below Font size when the box is narrower than the text. Font size becomes the maximum." },
  "minFontSize": { "type": "slider", "label": "Min font size (px)", "default": 20, "min": 8, "max": 120, "step": 1 },
  "color": { "type": "color", "label": "Color", "default": "#222017" },
  "idleWave": { "type": "toggle", "label": "Idle wave", "default": true }
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

function VariableName({
  text = 'Ted Dessert',
  baseWeight = 300,
  peakWeight = 700,
  radius = 180,
  fontSize = 84,
  fit = true,
  minFontSize = 20,
  color = '#222017',
  idleWave = true,
  ...props
}: {
  text?: string;
  baseWeight?: number;
  peakWeight?: number;
  radius?: number;
  fontSize?: number;
  fit?: boolean;
  minFontSize?: number;
  color?: string;
  idleWave?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLSpanElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const weights = useRef<number[]>([]);
  const raf = useRef<number>(0);

  const chars = Array.from(text);

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

    if (reduced) {
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

    const start = performance.now();
    const tick = (now: number) => {
      const wrapRect = wrap.getBoundingClientRect();
      for (let i = 0; i < spans.length; i++) {
        const s = spans[i];
        if (!s) continue;
        let target = baseWeight;
        if (pointer.current) {
          // Gaussian falloff on pointer distance — the experiments' curve.
          const cr = s.getBoundingClientRect();
          const cx = cr.left - wrapRect.left + cr.width / 2;
          const cy = cr.top - wrapRect.top + cr.height / 2;
          const d = Math.hypot(cx - pointer.current.x, cy - pointer.current.y);
          const t = d / Math.max(1, radius);
          target = baseWeight + (peakWeight - baseWeight) * Math.exp(-4 * t * t);
        } else if (idleWave) {
          // No pointer: a slow travelling wave keeps the wordmark alive.
          const phase = (now - start) / 1200 - i * 0.55;
          const w = Math.max(0, Math.sin(phase));
          target = baseWeight + (peakWeight - baseWeight) * 0.35 * w * w;
        }
        // Ease toward the target so weight changes feel damped, not twitchy.
        const next = weights.current[i] + (target - weights.current[i]) * 0.18;
        weights.current[i] = next;
        s.style.fontVariationSettings = `'wght' ${Math.round(next)}`;
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
  }, [text, baseWeight, peakWeight, radius, idleWave]);

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
      <span ref={rowRef} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
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
    </div>
  );
}

export default withResponsiveProps(VariableName);
