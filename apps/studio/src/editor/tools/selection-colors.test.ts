import { describe, it, expect } from 'vitest';
import type { CanvasNode } from '@/code/parsing/parser';
import type { ContainerOverrideMap } from '@/code/stores/container-query-store';
import { collectSelectionColors, collectSelectionIds, colorKey } from './selection-colors';

function node(id: string, partial: Partial<CanvasNode> = {}): CanvasNode {
  return {
    id, type: 'div', name: id, parentId: null, children: [], styles: {}, attrs: {},
    textContent: '', order: 0, isCanvasNode: false, componentFile: null,
    componentInstanceId: null, isComponentRoot: false, motionVariants: null,
    conditionalStyles: null, motionProps: null,
    ...partial,
  } as CanvasNode;
}

function tree(...ns: CanvasNode[]): Map<string, CanvasNode> {
  const m = new Map(ns.map(n => [n.id, n]));
  for (const n of ns) for (const c of n.children) { const child = m.get(c); if (child) child.parentId = n.id; }
  return m;
}

describe('colorKey', () => {
  it('collapses hex/rgb spellings of one color', () => {
    expect(colorKey('#fff')).toBe(colorKey('#FFFFFF'));
    expect(colorKey('rgb(255, 255, 255)')).toBe(colorKey('#ffffff'));
  });
  it('keeps tokens and gradients literal', () => {
    expect(colorKey('var(--brand)')).toBe('var(--brand)');
    expect(colorKey('linear-gradient(#000, #fff)')).toBe('linear-gradient(#000, #fff)');
  });
});

describe('collectSelectionIds', () => {
  it('descends, dedupes overlapping selections, skips ghosts', () => {
    const nodes = tree(
      node('hero', { children: ['name', 'cards'] }),
      node('name'),
      node('cards', { children: ['card', 'card__1'] }),
      node('card'),
      node('card__1'),
    );
    expect(collectSelectionIds(['hero', 'card'], nodes)).toEqual(['hero', 'name', 'cards', 'card']);
  });
});

describe('collectSelectionColors', () => {
  it('finds a color buried in a descendant and counts every usage', () => {
    const nodes = tree(
      node('hero', { children: ['title', 'card'], styles: { backgroundColor: '#fffdf9' } }),
      node('title', { styles: { color: '#3a3527' } }),
      node('card', { children: ['word'], styles: { backgroundColor: '#FFFDF9', borderColor: '#3a3527' } }),
      node('word', { styles: { color: '#f6f0e5' } }),
    );
    const groups = collectSelectionColors(['hero'], nodes);
    const byKey = Object.fromEntries(groups.map(g => [g.key, g]));
    expect(Object.keys(byKey).sort()).toEqual(['#3A3527', '#F6F0E5', '#FFFDF9']);
    expect(byKey['#FFFDF9'].nodeIds).toEqual(['hero', 'card']);
    expect(byKey['#3A3527'].hits.map(h => `${h.nodeId}.${h.prop}`)).toEqual(['title.color', 'card.borderColor']);
    expect(byKey['#F6F0E5'].hits).toEqual([{ nodeId: 'word', prop: 'color', channel: 'style', raw: '#f6f0e5', overridden: false }]);
    // Most-used first.
    expect(groups[0].key).toBe('#3A3527');
  });

  it('ignores transparent/none/currentColor and prop-bound values', () => {
    const nodes = tree(
      node('a', { styles: { backgroundColor: 'transparent', color: 'currentColor', borderColor: '#111111' }, styleVariables: { borderColor: 'accent' } }),
    );
    expect(collectSelectionColors(['a'], nodes)).toEqual([]);
  });

  it('uses the viewport override when one applies at that width', () => {
    const nodes = tree(node('a', { styles: { color: '#111111' } }));
    const overrides: ContainerOverrideMap = new Map([['a', new Map([[375, new Map([['color', '#222222']])]])]]);
    const desktop = collectSelectionColors(['a'], nodes, { vpWidth: 1440, overrides });
    const mobile = collectSelectionColors(['a'], nodes, { vpWidth: 375, overrides });
    expect(desktop[0].key).toBe('#111111');
    expect(mobile[0].key).toBe('#222222');
    expect(mobile[0].hits[0].overridden).toBe(true);
  });

  it('groups gradients and tokens literally, solids by canonical hex', () => {
    const nodes = tree(
      node('a', { styles: { backgroundImage: 'linear-gradient(#000, #fff)', color: 'var(--ink)' } }),
      node('b', { styles: { background: 'linear-gradient(#000, #fff)', backgroundColor: 'rgb(0, 0, 0)' } }),
      node('c', { styles: { color: '#000' } }),
    );
    const groups = collectSelectionColors(['a', 'b', 'c'], nodes);
    const grad = groups.find(g => g.isGradient)!;
    expect(grad.nodeIds).toEqual(['a', 'b']);
    expect(groups.find(g => g.isToken)!.key).toBe('var(--ink)');
    expect(groups.find(g => g.key === '#000000')!.nodeIds).toEqual(['b', 'c']);
  });

  it('reads SVG attributes only when CSS did not decide the paint', () => {
    const nodes = tree(
      node('shape', { type: 'path', attrs: { fill: '#ff0000', stroke: 'none' } }),
      node('shape2', { type: 'path', attrs: { fill: '#ff0000' }, styles: { fill: '#00ff00' } }),
    );
    const groups = collectSelectionColors(['shape', 'shape2'], nodes);
    const byKey = Object.fromEntries(groups.map(g => [g.key, g.hits.map(h => `${h.nodeId}:${h.channel}`)]));
    expect(byKey).toEqual({
      '#FF0000': ['shape:attr'],
      '#00FF00': ['shape2:style'],
    });
  });

  it('includes code-component color controls, authored or defaulted', () => {
    const nodes = tree(
      node('wordmark', { isCodeComponent: true, componentFile: 'components/VariableName.tsx', componentProps: { color: '"#222017"', text: '"Ted"' } }),
      node('plain', { isCodeComponent: true, componentFile: 'components/VariableName.tsx' }),
    );
    const groups = collectSelectionColors(['wordmark', 'plain'], nodes, {
      colorPropsOf: (n) => n.componentFile === 'components/VariableName.tsx' ? [{ prop: 'color', default: '#222017' }] : null,
    });
    expect(groups).toHaveLength(1);
    expect(groups[0].hits).toEqual([
      { nodeId: 'wordmark', prop: 'color', channel: 'prop', raw: '#222017' },
      { nodeId: 'plain', prop: 'color', channel: 'prop', raw: '#222017', implicit: true },
    ]);
  });
});
