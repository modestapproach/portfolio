'use client';

/** @label "Video Embed" */
/** @comment "Plays a hosted video in place: a Kickstarter widget, YouTube or Vimeo embed URL. Keeps its aspect ratio and fills the width of its box, with rounded corners and the site's card shadow." */
/** @controls {
  "src": { "type": "text", "label": "Embed URL", "default": "https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined/widget/video.html", "description": "The player URL, e.g. a Kickstarter …/widget/video.html, https://www.youtube.com/embed/ID or https://player.vimeo.com/video/ID." },
  "title": { "type": "text", "label": "Title", "default": "Video" },
  "aspectRatio": { "type": "text", "label": "Aspect ratio", "default": "16 / 9" },
  "radius": { "type": "slider", "label": "Corner radius (px)", "default": 18, "min": 0, "max": 40, "step": 1 }
} */

import React from 'react';
import { withResponsiveProps } from '@revyme/runtime';

function VideoEmbed({
  src = 'https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined/widget/video.html',
  title = 'Video',
  aspectRatio = '16 / 9',
  radius = 18,
  ...props
}: {
  src?: string;
  title?: string;
  aspectRatio?: string;
  radius?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  return (
    <div
      data-id={props['data-id'] as string | undefined}
      data-name={props['data-name'] as string | undefined}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: `${radius}px`,
        backgroundColor: '#0d0f14',
        boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)',
        ...props.style,
      }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: '0' }}
      />
    </div>
  );
}

export default withResponsiveProps(VideoEmbed);
