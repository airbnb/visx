import { Group } from '@vx/group';
import cx from 'classnames';
import React from 'react';

export default function Nodes({ nodes, nodeComponent, className }) {
  return (
    <Group>
      {nodes.map((node, i) => (
        <Group
          key={`network-node-${i}`}
          className={cx('vx-network-nodes', className)}
          transform={`translate(${node.x}, ${node.y})`}
        >
          {React.createElement(nodeComponent, { node })}
        </Group>
      ))}
    </Group>
  );
}
