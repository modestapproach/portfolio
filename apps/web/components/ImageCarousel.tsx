'use client';

/** @label "Image Carousel" */
/** @comment "A row of images you step through one at a time, with arrows, dots, swipe and arrow keys. Each slide keeps the same aspect ratio; captions show under the image." */
/** @controls {
  "images": { "type": "text", "label": "Images", "default": "/assets/graphic-design/metabob-logo-process/metabob-logo-process-01.webp", "description": "Image paths separated by commas." },
  "captions": { "type": "text", "label": "Captions", "default": "", "description": "One caption per image, separated by |." },
  "label": { "type": "text", "label": "Accessible label", "default": "Image carousel" },
  "aspectRatio": { "type": "text", "label": "Aspect ratio", "default": "1940 / 1458" },
  "radius": { "type": "slider", "label": "Corner radius (px)", "default": 18, "min": 0, "max": 40, "step": 1 }
} */

import React, { useCallback, useRef, useState } from 'react';
import { withResponsiveProps } from '@revyme/runtime';

const FONT = 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif';

function ImageCarousel({
  images = '/assets/graphic-design/metabob-logo-process/metabob-logo-process-01.webp',
  captions = '',
  label = 'Image carousel',
  aspectRatio = '1940 / 1458',
  radius = 18,
  ...props
}: {
  images?: string;
  captions?: string;
  label?: string;
  aspectRatio?: string;
  radius?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const list = images.split(',').map((s) => s.trim()).filter(Boolean);
  const caps = captions.split('|').map((s) => s.trim());
  const count = list.length;
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  const arrow = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    [side]: '14px',
    marginTop: '-22px',
    width: '44px',
    height: '44px',
    borderRadius: '9999px',
    border: '1px solid #E3E6EF',
    backgroundColor: 'rgba(255,255,255,.94)',
    color: '#16191C',
    fontSize: '20px',
    lineHeight: '1',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(20,27,77,.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div
      data-id={props['data-id'] as string | undefined}
      data-name={props['data-name'] as string | undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
      style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', outline: 'none', ...props.style }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '12px',
          backgroundColor: '#ffffff',
          borderRadius: `${radius}px`,
          boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)',
          boxSizing: 'border-box',
        }}
      >
        <div
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
          style={{ position: 'relative', width: '100%', aspectRatio, overflow: 'clip', borderRadius: `${Math.max(radius - 8, 0)}px`, backgroundColor: '#E5E5E5' }}
        >
          <div style={{ display: 'flex', height: '100%', transform: `translateX(-${index * 100}%)`, transition: 'transform .45s cubic-bezier(.2,.7,.2,1)' }}>
            {list.map((src, i) => (
              <div
                key={src}
                role="img"
                aria-roledescription="slide"
                aria-label={caps[i] || `Slide ${i + 1} of ${count}`}
                aria-hidden={i !== index}
                style={{ flex: '0 0 100%', height: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              />
            ))}
          </div>
          {count > 1 && (
            <>
              <button type="button" aria-label="Previous image" onClick={() => go(index - 1)} style={arrow('left')}>←</button>
              <button type="button" aria-label="Next image" onClick={() => go(index + 1)} style={arrow('right')}>→</button>
            </>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <p aria-live="polite" style={{ fontFamily: FONT, color: '#666C73', fontSize: '14px', lineHeight: '1.45', textAlign: 'center', margin: 0 }}>
          <span style={{ fontWeight: 600, color: '#16191C' }}>{index + 1} / {count}</span>
          {caps[index] ? ` · ${caps[index]}` : ''}
        </p>
        {count > 1 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {list.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                style={{ width: i === index ? '22px' : '8px', height: '8px', padding: 0, border: 0, borderRadius: '9999px', backgroundColor: i === index ? '#4358CD' : '#CDD2E0', cursor: 'pointer', transition: 'width .25s, background-color .25s' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withResponsiveProps(ImageCarousel);
