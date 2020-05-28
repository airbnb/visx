import React from 'react';
import HierarchyReadme from '!!raw-loader!../../../../vx-hierarchy/Readme.md';
import Cluster from '../../../../vx-hierarchy/src/hierarchies/Cluster';
import Pack from '../../../../vx-hierarchy/src/hierarchies/Pack';
import Partition from '../../../../vx-hierarchy/src/hierarchies/Partition';
import Tree from '../../../../vx-hierarchy/src/hierarchies/Tree';
import Treemap from '../../../../vx-hierarchy/src/hierarchies/Treemap';
import DocPage from '../../components/DocPage';

const components = [Cluster, Pack, Partition, Tree, Treemap];

export default () => (
  <DocPage components={components} readme={HierarchyReadme} vxPackage="hierarchy" />
);
