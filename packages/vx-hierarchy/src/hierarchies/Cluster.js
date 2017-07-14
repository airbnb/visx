import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { cluster as d3cluster } from 'd3-hierarchy';

export default function Cluster({
  top,
  left,
  className,
  root,
  size,
  nodeSize,
  separation,
  linkComponent,
  nodeComponent,
  ...restProps
}) {
  const cluster = d3cluster();
  if (size) cluster.size(size);
  if (nodeSize) cluster.nodeSize(nodeSize);
  if (separation) cluster.separation(separation);
  const data = cluster(root);
  const links = data.links();
  const descendants = root.descendants();
  return (
    <Group top={top} left={left}>
      {linkComponent && links.map((link, i) => (
        <Group key={`cluster-link-${i}`}>
          {React.createElement(linkComponent, { link })}
        </Group>
        ))}
      {nodeComponent && descendants.map((node, i) => (
        <Group key={`cluster-node-${i}`}>
          {React.createElement(nodeComponent, { node })}
        </Group>
        ))}
    </Group>
  );
}
