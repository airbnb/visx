import React from 'react';
import { Group } from '@vx/group';
import Links from './Links';
import Nodes from './Nodes';
import DefaultLink from './DefaultLink';
import DefaultNode from './DefaultNode';

export default function Graph({ graph, linkComponent = DefaultLink, nodeComponent = DefaultNode }) {
  return (
    <Group>
      <Links links={graph.links} linkComponent={linkComponent} />
      <Nodes nodes={graph.nodes} nodeComponent={nodeComponent} />
    </Group>
  );
}
