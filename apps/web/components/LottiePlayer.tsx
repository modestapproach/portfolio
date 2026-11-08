'use client';

/** @label "Lottie Player" */
/** @comment "Plays a Lottie animation (a Bodymovin .json export) inside the site's card frame. It starts when scrolled into view, pauses when it leaves, and holds a still frame for visitors who prefer reduced motion." */
/** @controls {
  "src": { "type": "text", "label": "Animation JSON", "default": "/assets/graphic-design/lottie/metabob-code-editor.json" },
  "label": { "type": "text", "label": "Accessible label", "default": "Animation" },
  "aspectRatio": { "type": "text", "label": "Aspect ratio", "default": "443 / 300" },
  "background": { "type": "text", "label": "Background", "default": "#ffffff" },
  "stillFrame": { "type": "slider", "label": "Reduced-motion frame", "default": 300, "min": 0, "max": 2000, "step": 1 },
  "radius": { "type": "slider", "label": "Corner radius (px)", "default": 18, "min": 0, "max": 40, "step": 1 }
} */

import React, { useEffect, useRef } from 'react';
import { withResponsiveProps } from '@revyme/runtime';

const PLAYER_SRC = '/vendor/lottie_svg-5.12.2.min.js';

type LottieAnim = { play(): void; pause(): void; goToAndStop(v: number, isFrame: boolean): void; destroy(): void };
type LottieLib = { loadAnimation(o: Record<string, unknown>): LottieAnim };

let playerPromise: Promise<LottieLib> | null = null;
function loadPlayer(): Promise<LottieLib> {
  const w = window as unknown as { lottie?: LottieLib };
  if (w.lottie) return Promise.resolve(w.lottie);
  if (!playerPromise) {
    playerPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = PLAYER_SRC;
      s.async = true;
      s.onload = () => (w.lottie ? resolve(w.lottie) : reject(new Error('lottie missing')));
      s.onerror = () => { playerPromise = null; reject(new Error('lottie failed to load')); };
      document.head.appendChild(s);
    });
  }
  return playerPromise;
}

function LottiePlayer({
  src = '/assets/graphic-design/lottie/metabob-code-editor.json',
  label = 'Animation',
  aspectRatio = '443 / 300',
  background = '#ffffff',
  stillFrame = 300,
  radius = 18,
  ...props
}: {
  src?: string;
  label?: string;
  aspectRatio?: string;
  background?: string;
  stillFrame?: number;
  radius?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let anim: LottieAnim | null = null;
    let visible = false;
    let cancelled = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!anim || reduce) return;
      if (visible) anim.play(); else anim.pause();
    }, { threshold: 0.25 });
    io.observe(el);

    loadPlayer().then((lottie) => {
      if (cancelled) return;
      anim = lottie.loadAnimation({ container: el, renderer: 'svg', loop: !reduce, autoplay: false, path: src, rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
      const a = anim as unknown as { addEventListener(e: string, f: () => void): void };
      a.addEventListener('DOMLoaded', () => {
        if (!anim) return;
        if (reduce) anim.goToAndStop(stillFrame, true);
        else if (visible) anim.play();
      });
    }).catch(() => {});

    return () => { cancelled = true; io.disconnect(); anim?.destroy(); };
  }, [src, stillFrame]);

  return (
    <div
      data-id={props['data-id'] as string | undefined}
      data-name={props['data-name'] as string | undefined}
      style={{
        position: 'relative',
        width: '100%',
        padding: '12px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderRadius: `${radius}px`,
        boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)',
        ...props.style,
      }}
    >
      <div
        ref={box}
        role="img"
        aria-label={label}
        style={{ position: 'relative', width: '100%', aspectRatio, overflow: 'clip', borderRadius: `${Math.max(radius - 8, 0)}px`, backgroundColor: background }}
      />
    </div>
  );
}

export default withResponsiveProps(LottiePlayer);
