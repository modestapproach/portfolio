// selection-colors.ts — aggregation behind the "Selection colors" tool.
//
// Figma's model: select anything, and every distinct color used ANYWHERE
// inside the selection is listed once, with a count and a way to jump to
// the nodes using it. The panel answers "where is this tan coming from?"
// without the user knowing which layer carries it.
//
// Pure: takes the node map + resolved options, returns plain data so it can
// sit inside `useNodesComputed` (deep-compared) and be unit tested.
//
// A color can live in several channels on one node; each usage is a `hit`
// that remembers its channel so the writer can route the edit back through
// the right mutation:
//   · 'style' — `node.styles[prop]` (or the current viewport's @media
//               override of it, flagged `overridden`)
//   · 'attr'  — SVG presentation attribute on a shape (`fill` / `stroke`).
//               Written back as the CSS property of the same name, which
//               beats the attribute in the cascade.
//   · 'prop'  — a code-component control of `type: 'color'`. An absent
//               prop still paints the control's default, so that counts
//               as a usage too (`implicit`), exactly like Figma showing
//               a component's default fill.
// Not aggregated (yet): motion/variant/hover colors, shadow colors, colors
// bound to a component prop via `styleVariables` (editing those would
// silently break the binding).

import type { CanvasNode } from '@/code/parsing/parser';
import { getOverridesAtWidth, type ContainerOverrideMap } from '@/code/stores/container-query-store';
import { toHexDisplay } from '@/editor/ui/color-utils';
import { isGhostNodeId } from '@/shared/ghost-id';

/** Style keys whose value is a single color. Union of the three lists the
 *  codebase already keeps (PresetPicker, LocaleStylePopup, page-variables). */
export const COLOR_STYLE_PROPS: readonly string[] = [
  'backgroundColor', 'color',
  'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'textDecorationColor', 'caretColor', 'accentColor', 'columnRuleColor',
  'fill', 'stroke', 'stopColor', 'floodColor',
];

/** Shorthands that may carry a gradient (or a bare color). */
const BACKGROUND_PROPS = ['background', 'backgroundImage'] as const;

/** Values that mean "no color" — skipping them keeps the list from being
 *  dominated by transparent defaults the user never chose. */
const EMPTY_VALUES = new Set([
  '', 'transparent', 'rgba(0, 0, 0, 0)', 'rgba(0,0,0,0)', 'none',
  'currentcolor', 'currentColor', 'inherit', 'initial', 'unset',
]);

export type ColorChannel = 'style' | 'attr' | 'prop';

export interface ColorHit {
  nodeId: string;
  /** Style key, attribute name, or component prop name — per `channel`. */
  prop: string;
  channel: ColorChannel;
  /** The value as authored (round-trips tokens and odd formats). */
  raw: string;
  /** 'style' only: the value comes from the current viewport's @media override. */
  overridden?: boolean;
  /** 'prop' only: the prop is not on the instance; the control's default paints. */
  implicit?: boolean;
}

export interface ColorGroup {
  /** Canonical identity — uppercase hex for solids, the literal `var(--x)`
   *  for tokens, the literal CSS for gradients. */
  key: string;
  /** Display/edit value: the key for solids and tokens, raw CSS for gradients. */
  value: string;
  isGradient: boolean;
  isToken: boolean;
  hits: ColorHit[];
  /** Distinct nodes using this color, in tree order. */
  nodeIds: string[];
}

export interface ColorControlDef {
  prop: string;
  default?: string;
}

export interface CollectOptions {
  /** Width of the interacting viewport — selects which @media band applies. */
  vpWidth?: number;
  /** Parsed @media overrides (containerOverridesAtom). */
  overrides?: ContainerOverrideMap;
  /** For a code-component instance, the controls typed `color`; null/undefined
   *  when the node isn't one or the registry has no schema for it. */
  colorPropsOf?: (node: CanvasNode) => ColorControlDef[] | null | undefined;
}

export function isGradientValue(v: string): boolean {
  return /\b(linear-gradient|radial-gradient|conic-gradient|repeating-)/.test(v);
}

function looksLikeColor(v: string): boolean {
  return /^(#|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color\()/i.test(v);
}

/** Group identity for a raw value. Solids collapse across formats
 *  (`#FFF`, `#ffffff`, `rgb(255,255,255)` are one group); tokens and
 *  gradients group on their literal text. */
export function colorKey(raw: string): string {
  const v = raw.trim();
  if (v.startsWith('var(')) return v;
  if (isGradientValue(v)) return v;
  return toHexDisplay(v);
}

/** Strip the quotes a JSX string prop carries in `componentProps`. */
function unquote(v: string): string {
  const t = v.trim();
  if (t.length >= 2 && ((t[0] === '"' && t[t.length - 1] === '"') || (t[0] === "'" && t[t.length - 1] === "'"))) {
    return t.slice(1, -1);
  }
  return t;
}

/** The selection plus every descendant, in tree order, each id once.
 *  Ghost `.map()` copies and locked layout chrome are skipped, matching
 *  select-all's exclusions. */
export function collectSelectionIds(selectedIds: readonly string[], nodes: Map<string, CanvasNode>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const visit = (id: string) => {
    if (seen.has(id)) return;
    if (isGhostNodeId(id) || id.startsWith('layout::')) return;
    const n = nodes.get(id);
    if (!n) return;
    seen.add(id);
    out.push(id);
    for (const c of n.children) visit(c);
  };
  for (const id of selectedIds) visit(id);
  return out;
}

export function collectSelectionColors(
  selectedIds: readonly string[],
  nodes: Map<string, CanvasNode>,
  opts: CollectOptions = {},
): ColorGroup[] {
  const groups = new Map<string, ColorGroup>();
  const add = (hit: ColorHit) => {
    const raw = hit.raw.trim();
    if (EMPTY_VALUES.has(raw) || raw.startsWith('url(')) return;
    const key = colorKey(raw);
    const isGradient = isGradientValue(raw);
    const isToken = raw.startsWith('var(');
    let g = groups.get(key);
    if (!g) {
      g = { key, value: isGradient ? raw : key, isGradient, isToken, hits: [], nodeIds: [] };
      groups.set(key, g);
    }
    g.hits.push({ ...hit, raw });
    if (!g.nodeIds.includes(hit.nodeId)) g.nodeIds.push(hit.nodeId);
  };

  for (const id of collectSelectionIds(selectedIds, nodes)) {
    const node = nodes.get(id)!;
    const base = node.styles ?? {};
    const ov = opts.overrides && opts.vpWidth
      ? getOverridesAtWidth(opts.overrides, id, opts.vpWidth)
      : null;
    const effective = (prop: string): { raw: string | undefined; overridden: boolean } => {
      const o = ov?.get(prop);
      if (o !== undefined && o !== '') return { raw: o, overridden: true };
      return { raw: base[prop], overridden: false };
    };

    for (const prop of COLOR_STYLE_PROPS) {
      if (node.styleVariables?.[prop]) continue; // bound to a component prop — not ours to rewrite
      const { raw, overridden } = effective(prop);
      if (raw) add({ nodeId: id, prop, channel: 'style', raw, overridden });
    }
    for (const prop of BACKGROUND_PROPS) {
      const { raw, overridden } = effective(prop);
      if (!raw) continue;
      if (isGradientValue(raw) || looksLikeColor(raw) || raw.trim().startsWith('var(')) {
        add({ nodeId: id, prop, channel: 'style', raw, overridden });
      }
    }
    // SVG shapes carry fill/stroke as attributes. Only count the attribute
    // when no CSS property already decided the paint for that channel.
    for (const attr of ['fill', 'stroke'] as const) {
      const raw = node.attrs?.[attr];
      if (raw && !effective(attr).raw) add({ nodeId: id, prop: attr, channel: 'attr', raw });
    }
    if (node.isCodeComponent && opts.colorPropsOf) {
      for (const def of opts.colorPropsOf(node) ?? []) {
        const authored = node.componentProps?.[def.prop];
        if (authored !== undefined && authored !== '') {
          const raw = unquote(authored);
          if (looksLikeColor(raw) || raw.startsWith('var(')) add({ nodeId: id, prop: def.prop, channel: 'prop', raw });
        } else if (def.default) {
          add({ nodeId: id, prop: def.prop, channel: 'prop', raw: def.default, implicit: true });
        }
      }
    }
  }

  return Array.from(groups.values()).sort(
    (a, b) => b.hits.length - a.hits.length || b.nodeIds.length - a.nodeIds.length || a.key.localeCompare(b.key),
  );
}
