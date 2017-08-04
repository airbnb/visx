import React from 'react';

import {Group} from '@vx/group';

import Graph from './Graph';

export default function Nodes({nodes, nodeComponent}) {
  return (<Group> {nodes.map(
    (node, i) =>
      <Group key={`network-node-${i}`} transform={`translate(${node.x}, ${node.y})`} >
        {React.createElement(nodeComponent, {node})}
      </Group>
  )}
  </Group>);
}
