'use client';

/** @label "Local Video" */
/** @comment "A self-hosted video with native playback controls and an optional English caption track. Loads on demand, without autoplay." */
/** @controls {
  "src": { "type": "text", "label": "Video URL", "default": "" },
  "poster": { "type": "text", "label": "Poster URL", "default": "" },
  "title": { "type": "text", "label": "Accessible title", "default": "Product demo" },
  "aspectRatio": { "type": "text", "label": "Aspect ratio", "default": "16 / 9" },
  "captionsSrc": { "type": "text", "label": "English captions URL", "default": "" }
} */

import React from 'react';
import { withResponsiveProps } from '@revyme/runtime';

function LocalVideo({ src = '', poster = '', title = 'Product demo', aspectRatio = '16 / 9', captionsSrc = '', ...props }: {
  src?: string;
  poster?: string;
  title?: string;
  aspectRatio?: string;
  captionsSrc?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  return (
    <div data-id={props['data-id'] as string | undefined} data-name={props['data-name'] as string | undefined}
      style={{ position: 'relative', width: '100%', aspectRatio, borderRadius: '18px', overflow: 'hidden', backgroundColor: '#F2F6F5', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', ...props.style }}>
      <video src={src} poster={poster} aria-label={title} controls playsInline preload="none"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}>
        {captionsSrc ? <track kind="captions" src={captionsSrc} srcLang="en" label="English" /> : null}
        Your browser does not support this video. <a href={src}>Download {title}</a>.
      </video>
    </div>
  );
}

export default withResponsiveProps(LocalVideo);
