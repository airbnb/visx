import React from 'react';
import NetworkReadme from '!!raw-loader!../../../../vx-network/Readme.md';
import Graph from '../../../../vx-network/src/Graph';
import Nodes from '../../../../vx-network/src/Nodes';
import Links from '../../../../vx-network/src/Links';
import DefaultNode from '../../../../vx-network/src/DefaultNode';
import DefaultLink from '../../../../vx-network/src/DefaultLink';
import DocPage from '../../components/DocPage';
import NetworkTile from '../../components/Gallery/NetworkTile';

const components = [Graph, Nodes, Links, DefaultNode, DefaultLink];

const examples = [NetworkTile];

export default () => (
  <DocPage components={components} examples={examples} readme={NetworkReadme} vxPackage="network" />
);
