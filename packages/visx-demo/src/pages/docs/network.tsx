import React from 'react';
import NetworkReadme from '!!raw-loader!../../../../visx-network/Readme.md';
import Graph from '../../../../visx-network/src/Graph';
import Nodes from '../../../../visx-network/src/Nodes';
import Links from '../../../../visx-network/src/Links';
import DefaultNode from '../../../../visx-network/src/DefaultNode';
import DefaultLink from '../../../../visx-network/src/DefaultLink';
import DocPage from '../../components/DocPage';
import NetworkTile from '../../components/Gallery/NetworkTile';

const components = [Graph, Nodes, Links, DefaultNode, DefaultLink];

const examples = [NetworkTile];

const NetworkDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={NetworkReadme}
    visxPackage="network"
  />
);
export default NetworkDocs;
