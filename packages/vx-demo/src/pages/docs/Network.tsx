import React from 'react';
import NetworkReadme from '!!raw-loader!../../../../vx-network/Readme.md';
import Graph from '../../../../vx-network/src/Graph';
import Nodes from '../../../../vx-network/src/Nodes';
import Links from '../../../../vx-network/src/Links';
import DefaultNode from '../../../../vx-network/src/DefaultNode';
import DefaultLink from '../../../../vx-network/src/DefaultLink';
import DocPage from '../../components/DocPage';

const components = [Graph, Nodes, Links, DefaultNode, DefaultLink];

export default () => <DocPage components={components} readme={NetworkReadme} vxPackage="network" />;
