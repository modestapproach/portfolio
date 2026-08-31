'use client';

/** @label "Variable Name" */
/** @comment "Pointer-reactive variable-font wordmark: the character nearest the cursor peaks in weight, neighbours decay on a gaussian. Idles on a slow weight wave. Ported from the type experiments' proximity view." */
/** @controls {
  "text": { "type": "text", "label": "Text", "default": "Ted Dessert" },
  "baseWeight": { "type": "slider", "label": "Base weight", "default": 300, "min": 100, "max": 700, "step": 10 },
  "peakWeight": { "type": "slider", "label": "Peak weight", "default": 700, "min": 100, "max": 700, "step": 10 },
  "radius": { "type": "slider", "label": "Radius (px)", "default": 180, "min": 40, "max": 600, "step": 10 },
  "fontSize": { "type": "slider", "label": "Font size (px)", "default": 84, "min": 24, "max": 240, "step": 2 },
  "color": { "type": "color", "label": "Color", "default": "#222017" },
  "idleWave": { "type": "toggle", "label": "Idle wave", "default": true }
} */

import React, { useEffect, useRef } from 'react';
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

function VariableName({
  text = 'Ted Dessert',
  baseWeight = 300,
  peakWeight = 700,
  radius = 180,
  fontSize = 84,
  color = '#222017',
  idleWave = true,
  ...props
}: {
  text?: string;
  baseWeight?: number;
  peakWeight?: number;
  radius?: number;
  fontSize?: number;
  color?: string;
  idleWave?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const weights = useRef<number[]>([]);
  const raf = useRef<number>(0);

  const chars = Array.from(text);

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
    <div
      data-id={props['data-id']}
      data-name={props['data-name']}
      ref={wrapRef}
      aria-label={text}
      role="heading"
      aria-level={1}
      style={{ position: 'relative', display: 'inline-block', cursor: 'default', ...props.style }}
    >
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
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
              fontSize: `${fontSize}px`,
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
