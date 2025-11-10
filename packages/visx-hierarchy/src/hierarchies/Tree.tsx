import { createElement } from 'react';
import type { ReactNode, FunctionComponent, ComponentClass } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import type { HierarchyNode, HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';
import { tree as d3tree } from 'd3-hierarchy';
import DefaultLink from '../HierarchyDefaultLink';
import DefaultNode from '../HierarchyDefaultNode';

export type NodeComponentProps<Datum> = { node: HierarchyPointNode<Datum> };
export type LinkComponentProps<Datum> = { link: HierarchyPointLink<Datum> };

export type TreeProps<Datum> = {
  /** The root hierarchy node from which to derive the tree layout. */
  root: HierarchyNode<Datum>;
  /** Render override function which is passed the computed cluster layout data. */
  children?: (pack: HierarchyPointNode<Datum>) => ReactNode;
  /** top offset applied to the g element container. */
  top?: number;
  /** left offset applied to the g element container. */
  left?: number;
  /** className applied to the g element container. */
  className?: string;
  /**
   * Sets this tree layout’s size to the specified two-element array of numbers `[width, height]`.
   * This is an arbitrary coordinate system, e.g., for a radial layout, a size of `[360, radius]`
   * corresponds to a breadth of 360° and a depth of radius.
   */
  size?: [number, number];
  /**
   * Sets this tree layout’s node size to the specified two-element array of numbers `[width, height]`.
   * If unset, layout size is used instead.  When a node size is specified, the root node is always
   * positioned at `⟨0, 0⟩`.
   */
  nodeSize?: [number, number];
  /**
   * Sets the layout's separation accessor used to determine the separation of neighboring nodes.
   * See https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_separation for more.
   */
  separation?: (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number;
  /** Component which renders a single cluster link, passed the link object. */
  linkComponent?:
    | FunctionComponent<LinkComponentProps<Datum>>
    | ComponentClass<LinkComponentProps<Datum>>;
  /** Component which renders a single cluster node, passed the node object. */
  nodeComponent?:
    | FunctionComponent<NodeComponentProps<Datum>>
    | ComponentClass<NodeComponentProps<Datum>>;
};

export default function Tree<Datum>({
  top,
  left,
  className,
  root,
  size,
  nodeSize,
  separation,
  children,
  linkComponent = DefaultLink,
  nodeComponent = DefaultNode,
}: TreeProps<Datum>) {
  const tree = d3tree<Datum>();
  if (size) tree.size(size);
  if (nodeSize) tree.nodeSize(nodeSize);
  if (separation) tree.separation(separation);

  const data = tree(root);

  if (children) return <>{children(data)}</>;

  return (
    <Group top={top} left={left} className={cx('visx-tree', className)}>
      {linkComponent &&
        data
          .links()
          .map((link, i) => (
            <Group key={`tree-link-${i}`}>{createElement(linkComponent, { link })}</Group>
          ))}
      {nodeComponent &&
        data
          .descendants()
          .map((node, i) => (
            <Group key={`tree-node-${i}`}>{createElement(nodeComponent, { node })}</Group>
          ))}
    </Group>
  );
}
