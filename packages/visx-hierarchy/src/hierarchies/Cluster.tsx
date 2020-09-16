import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import {
  cluster as d3cluster,
  HierarchyNode,
  HierarchyPointNode,
  HierarchyPointLink,
} from 'd3-hierarchy';
import DefaultLink from '../HierarchyDefaultLink';
import DefaultNode from '../HierarchyDefaultNode';

export type NodeComponentProps<Datum> = { node: HierarchyPointNode<Datum> };
export type LinkComponentProps<Datum> = { link: HierarchyPointLink<Datum> };

export type ClusterProps<Datum> = {
  /** The root hierarchy node from which to derive the treemap layout. */
  root: HierarchyNode<Datum>;
  /** Render override function which is passed the computed cluster layout data. */
  children?: (pack: HierarchyPointNode<Datum>) => React.ReactNode;
  /** top offset applied to the g element container. */
  top?: number;
  /** left offset applied to the g element container. */
  left?: number;
  /** className applied to the g element container. */
  className?: string;
  /**
   * Sets this cluster layout’s size to the specified two-element array of numbers `[width, height]`.
   * This is an arbitrary coordinate system, e.g., for a radial layout, a size of `[360, radius]`
   * corresponds to a breadth of 360° and a depth of radius.
   */
  size?: [number, number];
  /**
   * Sets this cluster layout’s node size to the specified two-element array of numbers `[width, height]`.
   * If unset, layout size is used instead.  When a node size is specified, the root node is always
   * positioned at `⟨0, 0⟩`.
   */
  nodeSize?: [number, number];
  /** Sets the separation accessor, used to separate neighboring leaves. */
  separation?: (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number;
  /** Component which renders a single cluster link, passed the link object. */
  linkComponent?:
    | React.FunctionComponent<LinkComponentProps<Datum>>
    | React.ComponentClass<LinkComponentProps<Datum>>;
  /** Component which renders a single cluster node, passed the node object. */
  nodeComponent?:
    | React.FunctionComponent<NodeComponentProps<Datum>>
    | React.ComponentClass<NodeComponentProps<Datum>>;
};

export default function Cluster<Datum>({
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
}: ClusterProps<Datum>) {
  const cluster = d3cluster<Datum>();
  if (size) cluster.size(size);
  if (nodeSize !== undefined) cluster.nodeSize(nodeSize);
  if (separation) cluster.separation(separation);

  const data = cluster(root);

  if (children) return <>{children(data)}</>;

  return (
    <Group top={top} left={left} className={cx('vx-cluster', className)}>
      {linkComponent &&
        data.links().map((link, i) => {
          return (
            <Group key={`cluster-link-${i}`}>{React.createElement(linkComponent, { link })}</Group>
          );
        })}
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`cluster-node-${i}`}>{React.createElement(nodeComponent, { node })}</Group>
          );
        })}
    </Group>
  );
}
