import { createElement } from 'react';
import type { ReactNode, FunctionComponent, ComponentClass } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import type { HierarchyRectangularNode, HierarchyNode } from 'd3-hierarchy';
import { treemap as d3treemap } from 'd3-hierarchy';
import HierarchyDefaultRectNode from '../HierarchyDefaultRectNode';
import setNumberOrNumberAccessor from '../utils/setNumOrNumAccessor';
import type { TileMethod } from '../types';

export type NodeComponentProps<Datum> = { node: HierarchyRectangularNode<Datum> };

type NumerOrNumberAccessor<Datum> = number | ((node: HierarchyRectangularNode<Datum>) => number);

export type TreemapProps<Datum> = {
  /** The root hierarchy node from which to derive the treemap layout. */
  root: HierarchyNode<Datum>;
  /** Render override function which is passed the computed pack layout data. */
  children?: (pack: HierarchyRectangularNode<Datum>) => ReactNode;
  /** top offset applied to the g element container. */
  top?: number;
  /** left offset applied to the g element container. */
  left?: number;
  /** className applied to the g element container. */
  className?: string;
  /**
   * Sets the treemap tiling method to the specified function (exported from this package).
   * See https://github.com/d3/d3-hierarchy#treemap for more.
   */
  tile?: TileMethod<Datum>;
  /** Sets this treemap layout’s size to the specified two-element array of numbers [width, height]  */
  size?: [number, number];
  /** Whether to round treemap values. */
  round?: boolean;
  /** Sets both inner and outer padding to the specified number or accessor. */
  padding?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to separate a node’s adjacent children. */
  paddingInner?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to spearate a node from its children. */
  paddingOuter?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to spearate the top edge of a node from its children. */
  paddingTop?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to spearate the right edge of a node from its children. */
  paddingRight?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to spearate the bottom edge of a node from its children. */
  paddingBottom?: NumerOrNumberAccessor<Datum>;
  /** Sets padding used to spearate the left edge of a node from its children. */
  paddingLeft?: NumerOrNumberAccessor<Datum>;
  /** Component which renders a single pack node, passed the node object. */
  nodeComponent?:
    | FunctionComponent<NodeComponentProps<Datum>>
    | ComponentClass<NodeComponentProps<Datum>>;
};

export default function Treemap<Datum>({
  top,
  left,
  className,
  root,
  tile,
  size,
  round,
  padding,
  paddingInner,
  paddingOuter,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  children,
  nodeComponent = HierarchyDefaultRectNode,
}: TreemapProps<Datum>) {
  const treemap = d3treemap<Datum>();
  if (tile) treemap.tile(tile);
  if (size) treemap.size(size);
  if (round) treemap.round(round);
  if (padding) setNumberOrNumberAccessor(treemap.padding, padding);
  if (paddingInner) setNumberOrNumberAccessor(treemap.paddingInner, paddingInner);
  if (paddingOuter) setNumberOrNumberAccessor(treemap.paddingOuter, paddingOuter);
  if (paddingTop) setNumberOrNumberAccessor(treemap.paddingTop, paddingTop);
  if (paddingRight) setNumberOrNumberAccessor(treemap.paddingRight, paddingRight);
  if (paddingBottom) setNumberOrNumberAccessor(treemap.paddingBottom, paddingBottom);
  if (paddingLeft) setNumberOrNumberAccessor(treemap.paddingLeft, paddingLeft);

  const data = treemap(root);

  if (children) return <>{children(data)}</>;

  return (
    <Group top={top} left={left} className={cx('visx-treemap', className)}>
      {nodeComponent &&
        data
          .descendants()
          .map((node, i) => (
            <Group key={`treemap-node-${i}`}>{createElement(nodeComponent, { node })}</Group>
          ))}
    </Group>
  );
}
