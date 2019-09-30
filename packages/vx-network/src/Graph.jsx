import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Links from './Links';
import Nodes from './Nodes';
import DefaultLink from './DefaultLink';
import DefaultNode from './DefaultNode';

Graph.propTypes = {
  graph: PropTypes.object,
  linkComponent: PropTypes.any,
  nodeComponent: PropTypes.any,
};

export default function Graph({ graph, linkComponent = DefaultLink, nodeComponent = DefaultNode }) {
  return (
    <Group>
      <Links links={graph.links} linkComponent={linkComponent} />
      <Nodes nodes={graph.nodes} nodeComponent={nodeComponent} />
    </Group>
  );
}
