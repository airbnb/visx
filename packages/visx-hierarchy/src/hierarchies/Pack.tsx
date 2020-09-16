import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { pack as d3pack, HierarchyNode, HierarchyCircularNode } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';

type PackProps<Datum> = {
  /** The root hierarchy node from which to derive the pack layout. */
  root: HierarchyNode<Datum>;
  /** Render override function which is passed the computed pack layout data. */
  children?: (pack: HierarchyCircularNode<Datum>) => React.ReactNode;
  /** top offset applied to the g element container. */
  top?: number;
  /** left offset applied to the g element container. */
  left?: number;
  /** className applied to the g element container. */
  className?: string;
  /**
   * Radius accessor function which defines the radius of each leaf node.
   * If the radius accessor is null, the radius of each leaf circle is derived
   * from the leaf node.value, and scaled proportionally to fit within
   * the defined layout `size`.
   */
  radius?: (node: HierarchyNode<Datum>) => number;
  /** Sets the pack layout size to the defined [width, height]. */
  size?: [number, number];
  /**
   * Sets this pack layout’s padding accessor to the specified number or function,
   * which determines approximate separation of nodes in the resulting pack.
   */
  padding?: number;
  /** Component which renders a single pack node, passed the node object. */
  nodeComponent?:
    | React.FunctionComponent<NodeComponentProps<Datum>>
    | React.ComponentClass<NodeComponentProps<Datum>>;
};

export type NodeComponentProps<Datum> = { node: HierarchyCircularNode<Datum> };

export default function Pack<Datum>({
  top,
  left,
  className,
  root,
  radius,
  size,
  padding,
  children,
  nodeComponent = DefaultNode,
}: PackProps<Datum>) {
  const pack = d3pack<Datum>();
  if (size) pack.size(size);
  if (radius !== undefined) pack.radius(radius);
  if (padding) pack.padding(padding);

  const data = pack(root);

  if (children) return <>{children(data)}</>;

  return (
    <Group top={top} left={left} className={cx('vx-pack', className)}>
      {nodeComponent &&
        data.descendants().map((node, i) => {
          return (
            <Group key={`pack-node-${i}`}>{React.createElement(nodeComponent, { node })}</Group>
          );
        })}
    </Group>
  );
}
