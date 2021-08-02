import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';

import DefaultNode from './DefaultNode';
import { NodeProvidedProps } from './types';

export type NodeProps<Node> = {
  /** Array of links to render. */
  nodes?: Node[];
  /** Component for rendering a single link. */
  nodeComponent:
    | React.FunctionComponent<NodeProvidedProps<Node>>
    | React.ComponentClass<NodeProvidedProps<Node>>;
  /** Classname to add to each node parent g element. */
  className?: string;
  /** Returns the center x coordinate of a node. */
  x?: (d: Node) => number;
  /** Returns the center y coordinate of a node. */
  y?: (d: Node) => number;
};

export default function Nodes<Node>({
  nodes = [],
  nodeComponent = DefaultNode,
  className,
  x = (d: any) => d?.x || 0,
  y = (d: any) => d?.y || 0,
}: NodeProps<Node>) {
  return (
    <>
      {nodes.map((node, i) => (
        <Group
          key={`network-node-${i}`}
          className={cx('visx-network-node', className)}
          left={x(node)}
          top={y(node)}
        >
          {React.createElement(nodeComponent, { node })}
        </Group>
      ))}
    </>
  );
}
