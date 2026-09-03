// SelectionTool.tsx — "Selection colors" (Figma parity).
//
// Every distinct color used ANYWHERE inside the current selection — the
// selected nodes and all their descendants — listed once, most-used first.
// Works on a single selection too: select the page root and you see every
// color on the page. Each row:
//   · a ColorInput — editing it rewrites EVERY usage of that color inside
//     the selection (one undo step), so a color can be changed without
//     knowing which layer carries it;
//   · a usage count;
//   · a target button — selects the nodes using the color and reveals them
//     in the layers panel, so the user can find WHERE it lives. Hovering the
//     row outlines those nodes on the canvas first.
//
// Aggregation lives in selection-colors.ts (pure, tested). Writes route per
// hit channel: styles through `updateNodeStyles` (which already knows
// whether the interacting viewport is a replica and lands the value in the
// right @media band), code-component props through the same
// setInstanceProp / setResponsiveOverride path ComponentPropsTool uses.
// Live drag frames patch the DOM only; the code commit runs once on
// release — the pattern that keeps the picker at 60fps on a multi-node edit.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import type { CanvasNode } from '@/code/parsing/parser';
import {
  selectedIdsAtom, getNodeFromCache,
  layersRevealRequestAtom, colorMatchHighlightAtom,
} from '@/code/stores/store';
import { useNodesComputed } from '@/code/stores/node-family';
import { containerOverridesAtom } from '@/code/stores/container-query-store';
import { interactingViewportIdAtom, interactingViewportWidthAtom, isReplicaViewportAtom } from '@/code/stores/viewport-store';
import { leftPanelAtom } from '@/code/stores/left-panel-store';
import { projectFS, stableProjectVersionAtom } from '@/code/project/project-fs';
import { activeFilePathAtom } from '@/code/project/active-file-store';
import { isComponentFilePath } from '@/code/project/file-path-kind';
import { modifyProjectFile } from '@/code/project/modify-file';
import { buildComponentRegistry } from '@/code/components/component-registry';
import type { ComponentControlDef } from '@/code/components/controls-parser';
import { setResponsiveOverride } from '@/code/components/instance-prop-overrides';
import { parseInstanceProps, setInstanceProp } from './ComponentPropsTool/instance-props';
import { renderCodeComponentDirect } from '@/canvas/CodeComponentHost';
import { updateNodeStyles, getContentRoot, parseRectCacheKey } from '@/canvas/node-ops';
import { getCanvasBridge } from '@/canvas/canvas-bridge';
import { useLivePreview } from '../hooks/useLivePreview';
import ColorInput from '../controls/ColorInput';
import ToolSection from '../controls/ToolSection';
import { ColorSwatch, ControlActionRow } from '../controls';
import ToolPopup from '../ui/ToolPopup';
import GradientEditor from '../ui/GradientEditor';
import { isGhostNodeId } from '@/shared/ghost-id';
import { trace } from '@/shared/debug-trace';
import { collectSelectionColors, type ColorControlDef, type ColorGroup, type ColorHit } from './selection-colors';

/** Rows shown before the list collapses behind "See all N colors". */
const INLINE_LIMIT = 8;

// ─── Writers ─────────────────────────────────────────────────────────────────

/** Split a group's hits into the per-node style maps and the code-component
 *  prop hits, each of which has its own write path. */
function partitionHits(hits: ColorHit[], value: string) {
  const styles = new Map<string, Record<string, string>>();
  const props: ColorHit[] = [];
  for (const h of hits) {
    if (h.channel === 'prop') { props.push(h); continue; }
    // 'attr' (SVG fill/stroke) is written as the CSS property of the same
    // name — the cascade prefers it over the presentation attribute, and it
    // rides the normal per-viewport style routing.
    const m = styles.get(h.nodeId) ?? {};
    m[h.prop] = value;
    styles.set(h.nodeId, m);
  }
  return { styles, props };
}

/** LIVE — DOM patch only, no code write. Fans across every viewport prefix
 *  the bridge knows about (a base edit shows on every tile). */
function livePatchStyles(styles: Map<string, Record<string, string>>): void {
  const bridge = getCanvasBridge();
  const rectCache = (bridge as any).rectCache as Map<string, DOMRect> | undefined;
  const prefixes = new Set<string>(['']);
  if (rectCache) {
    for (const key of rectCache.keys()) {
      const parsed = parseRectCacheKey(key);
      if (parsed) prefixes.add(parsed.vpPrefix);
    }
  }
  for (const [id, map] of styles) {
    for (const prefix of prefixes) bridge.patchStyles(id, prefix, map);
  }
}

/** COMMIT — one `updateNodeStyles` per node, all synchronously, so the
 *  history debounce folds the whole group into a single undo entry. */
function commitStyles(styles: Map<string, Record<string, string>>): void {
  const contentEl = getContentRoot();
  if (!contentEl) return;
  for (const [id, map] of styles) updateNodeStyles({ id, styles: map, contentEl });
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function TargetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// ─── Rows ────────────────────────────────────────────────────────────────────

interface RowProps {
  group: ColorGroup;
  onLive: (group: ColorGroup, value: string) => void;
  onCommit: (group: ColorGroup, value: string) => void;
  onHover: (group: ColorGroup | null) => void;
  onSelectUsers: (group: ColorGroup) => void;
}

function GradientRow({ group, onLive, onCommit }: Pick<RowProps, 'group' | 'onLive' | 'onCommit'>) {
  const btnRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [livePreview, setLivePreview] = useLivePreview<string>([group.value]);
  const display = livePreview ?? group.value;
  return (
    <>
      <span ref={btnRef} className="contents">
        <ControlActionRow onClick={() => setIsOpen(true)} className="justify-between">
          <span className="flex items-center gap-2 truncate">
            <ColorSwatch style={{ background: display }} />
            <span className="text-xs truncate text-[var(--text-primary)]">Gradient</span>
          </span>
        </ControlActionRow>
      </span>
      <ToolPopup isOpen={isOpen} onClose={() => setIsOpen(false)} title="Gradient" anchorRef={btnRef} width={280}>
        <GradientEditor
          value={group.value}
          onChange={(css) => onCommit(group, css)}
          onLiveChange={(css) => { onLive(group, css); setLivePreview(css); }}
          hideOverlay
        />
      </ToolPopup>
    </>
  );
}

function ColorRow({ group, onLive, onCommit, onHover, onSelectUsers }: RowProps) {
  const n = group.nodeIds.length;
  const places = group.hits.length;
  const countTitle = places === n ? `${n} layer${n === 1 ? '' : 's'}` : `${places} usages on ${n} layer${n === 1 ? '' : 's'}`;
  return (
    <div
      className="flex items-center gap-1.5 w-full min-w-0"
      onMouseEnter={() => onHover(group)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex-1 min-w-0">
        {group.isGradient ? (
          <GradientRow group={group} onLive={onLive} onCommit={onCommit} />
        ) : (
          <ColorInput
            value={group.value}
            onChangeLive={(c) => onLive(group, c)}
            onChange={(c) => onCommit(group, c)}
            showAlpha
          />
        )}
      </div>
      <span className="text-[10px] text-[var(--text-disabled)] tabular-nums w-4 text-right shrink-0 select-none" title={countTitle}>
        {n}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onSelectUsers(group); }}
        className="w-5 h-5 flex items-center justify-center shrink-0 cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        title={`Select ${n} layer${n === 1 ? '' : 's'} using this color`}
      >
        <TargetIcon />
      </button>
    </div>
  );
}

// ─── Tool ────────────────────────────────────────────────────────────────────

export default function SelectionTool() {
  const selectedIds = useAtomValue(selectedIdsAtom);
  const vpId = useAtomValue(interactingViewportIdAtom);
  const vpWidth = useAtomValue(interactingViewportWidthAtom);
  const isReplica = useAtomValue(isReplicaViewportAtom);
  const overrides = useAtomValue(containerOverridesAtom);
  const activeFile = useAtomValue(activeFilePathAtom);
  const projectVersion = useAtomValue(stableProjectVersionAtom);
  const setSelectedIds = useSetAtom(selectedIdsAtom);
  const setLeftPanel = useSetAtom(leftPanelAtom);
  const setReveal = useSetAtom(layersRevealRequestAtom);
  const setHighlight = useSetAtom(colorMatchHighlightAtom);
  const [showAll, setShowAll] = useState(false);

  // Which code-component controls are colors, per component file. Component
  // MASTER files route instance props through variant branches; the
  // aggregator stays style-only there.
  const colorControls = useMemo(() => {
    if (isComponentFilePath(activeFile)) return null;
    const byFile = new Map<string, { name: string; props: ColorControlDef[] }>();
    const walk = (defs: Record<string, ComponentControlDef> | undefined, out: ColorControlDef[]) => {
      for (const [prop, def] of Object.entries(defs ?? {})) {
        if (def.type === 'color') out.push({ prop, default: typeof def.default === 'string' ? def.default : undefined });
        if (def.type === 'group') walk(def.controls, out);
      }
    };
    for (const info of buildComponentRegistry(projectFS).values()) {
      if (!info.controlsMeta) continue;
      const props: ColorControlDef[] = [];
      walk(info.controlsMeta.controls, props);
      if (props.length) byFile.set(info.filePath, { name: info.name, props });
    }
    return byFile;
    // projectVersion is the registry's cache key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFile, projectVersion]);

  const colorPropsOf = useCallback(
    (node: CanvasNode) => (node.componentFile ? colorControls?.get(node.componentFile)?.props ?? null : null),
    [colorControls],
  );

  const groups = useNodesComputed(
    (nodes) => collectSelectionColors(selectedIds, nodes, { vpWidth, overrides, colorPropsOf }),
    [selectedIds, vpWidth, overrides, colorPropsOf],
  );

  // Never leave a stale outline behind when the panel goes away.
  useEffect(() => () => setHighlight(null), [setHighlight]);

  const onLive = useCallback((group: ColorGroup, value: string) => {
    const { styles, props } = partitionHits(group.hits, value);
    livePatchStyles(styles);
    for (const h of props) renderCodeComponentDirect(h.nodeId, { [h.prop]: value }, isReplica ? vpWidth : undefined);
  }, [isReplica, vpWidth]);

  const onCommit = useCallback((group: ColorGroup, value: string) => {
    trace.action('selection-colors:commit', { from: group.key, to: value, hits: group.hits.length, nodes: group.nodeIds.length });
    const { styles, props } = partitionHits(group.hits, value);
    commitStyles(styles);
    if (props.length && colorControls) {
      modifyProjectFile(activeFile, (code) => {
        let next = code;
        for (const h of props) {
          const file = getNodeFromCache(h.nodeId)?.componentFile;
          const comp = file ? colorControls.get(file) : undefined;
          if (!comp) continue;
          if (isReplica) {
            const base = parseInstanceProps(next, h.nodeId, comp.name).get(h.prop) ?? null;
            next = setResponsiveOverride(next, h.nodeId, comp.name, vpWidth, h.prop, value, base);
          } else {
            next = setInstanceProp(next, h.nodeId, comp.name, h.prop, value);
          }
        }
        return next;
      });
    }
  }, [activeFile, colorControls, isReplica, vpWidth]);

  const onHover = useCallback((group: ColorGroup | null) => {
    setHighlight(group ? group.nodeIds.map(nodeId => ({ nodeId, vpId })) : null);
  }, [setHighlight, vpId]);

  const onSelectUsers = useCallback((group: ColorGroup) => {
    const ids = group.nodeIds.filter(id => !isGhostNodeId(id));
    if (ids.length === 0) return;
    trace.action('selection-colors:select-users', { key: group.key, count: ids.length, vpId });
    setHighlight(null);
    setLeftPanel('layers');
    setSelectedIds(ids);
    setReveal({ nodeIds: ids, vpId, nonce: Date.now() });
  }, [setHighlight, setLeftPanel, setSelectedIds, setReveal, vpId]);

  if (selectedIds.length === 0 || groups.length === 0) return null;

  const visible = showAll ? groups : groups.slice(0, INLINE_LIMIT);
  const hidden = groups.length - visible.length;

  return (
    <ToolSection title="Selection colors">
      <div className="flex flex-col gap-1.5 w-full">
        {visible.map(group => (
          // Keyed by the first usage, not the value: a value-keyed row would
          // unmount on commit and close the picker under the pointer.
          <ColorRow
            key={`${group.hits[0].nodeId}:${group.hits[0].prop}`}
            group={group}
            onLive={onLive}
            onCommit={onCommit}
            onHover={onHover}
            onSelectUsers={onSelectUsers}
          />
        ))}
        {hidden > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="h-7 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer text-left transition-colors"
          >
            See all {groups.length} colors
          </button>
        )}
        {showAll && groups.length > INLINE_LIMIT && (
          <button
            onClick={() => setShowAll(false)}
            className="h-7 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer text-left transition-colors"
          >
            Show fewer
          </button>
        )}
      </div>
    </ToolSection>
  );
}
