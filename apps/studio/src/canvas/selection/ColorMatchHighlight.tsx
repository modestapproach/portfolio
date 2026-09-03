// ColorMatchHighlight.tsx — outlines on every canvas node that uses the color
// whose row the pointer is over in the "Selection colors" tool. Driven by
// `colorMatchHighlightAtom` (a list, because one color usually lives on many
// nodes) — the single-value `hoveredIdAtom` is read as a scalar all over the
// selection overlay and must not be widened.
//
// Same shape as LayerDropHighlight: rect-cache based (`findNodeRect`) so the
// nodes resolve without being the canvas-hovered element, and mounted as a
// sibling of SelectionOverlay so it is independent of that component's early
// returns.

import { useAtomValue } from 'jotai';
import { usePolledValue } from '@/canvas/hooks/usePolledValue';
import { colorMatchHighlightAtom } from '@/code/stores/store';
import { SELECTION_COLOR } from '@/shared/constants';
import { findNodeRect } from '@/canvas/node-ops';
import { cornersFromRect, cornersEqual, type ScreenCorners } from '@/canvas/resize/geometry-utils';

export default function ColorMatchHighlight() {
  const targets = useAtomValue(colorMatchHighlightAtom);
  const key = targets ? targets.map(t => `${t.vpId}:${t.nodeId}`).join('|') : '';

  const boxes = usePolledValue<ScreenCorners[]>(
    !!targets && targets.length > 0,
    (prev) => {
      if (!targets || targets.length === 0) return null;
      const next: ScreenCorners[] = [];
      for (const t of targets) {
        const rect = findNodeRect(t.nodeId, t.vpId);
        if (rect) next.push(cornersFromRect(rect));
      }
      if (prev && prev.length === next.length && next.every((c, i) => cornersEqual(prev[i], c))) return prev;
      return next;
    },
    [key],
    { immediate: true },
  );

  if (!boxes || boxes.length === 0) return null;

  return (
    <svg
      style={{
        position: 'fixed',
        left: 0, top: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 2,
      }}
    >
      {boxes.map(({ TL, TR, BR, BL }, i) => (
        <path
          key={i}
          d={`M ${TL.x} ${TL.y} L ${TR.x} ${TR.y} L ${BR.x} ${BR.y} L ${BL.x} ${BL.y} Z`}
          fill={SELECTION_COLOR}
          fillOpacity={0.08}
          stroke={SELECTION_COLOR}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
