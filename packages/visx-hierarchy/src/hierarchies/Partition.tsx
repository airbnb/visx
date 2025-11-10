import { createElement } from 'react';
import type { ReactNode, FunctionComponent, ComponentClass } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import type { HierarchyNode, HierarchyRectangularNode } from 'd3-hierarchy';
import { partition as d3partition } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultRectNode';

export type NodeComponentProps<Datum> = { node: HierarchyRectangularNode<Datum> };

export type PartitionProps<Datum> = {
  /** The root hierarchy node from which to derive the treemap layout. */
  root: HierarchyNode<Datum>;
  /** Render override function which is passed the computed partition layout data. */
  children?: (pack: HierarchyRectangularNode<Datum>) => ReactNode;
  /** top offset applied to the g element container. */
  top?: number;
  /** left offset applied to the g element container. */
  left?: number;
  /** className applied to the g element container. */
  className?: string;
  /** Sets this partition layout’s size to the specified two-element array of numbers `[width, height]` . */
  size?: [number, number];
  /** Whether partition layout rounds values. */
  round?: boolean;
  /** Sets padding, used to separate a node’s adjacent children. */
  padding?: number;
  /** Component which renders a single cluster node, passed the node object. */
  nodeComponent?:
    | FunctionComponent<NodeComponentProps<Datum>>
    | ComponentClass<NodeComponentProps<Datum>>;
};

export default function Partition<Datum>({
  top,
  left,
  className,
  root,
  size,
  round,
  padding,
  children,
  nodeComponent = DefaultNode,
}: PartitionProps<Datum>) {
  const partition = d3partition<Datum>();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);

  const data = partition(root);

  if (children) return <>{children(data)}</>;

  return (
    <Group top={top} left={left} className={cx('visx-partition', className)}>
      {nodeComponent &&
        data
          .descendants()
          .map((node, i) => (
            <Group key={`partition-node-${i}`}>{createElement(nodeComponent, { node })}</Group>
          ))}
    </Group>
  );
}
