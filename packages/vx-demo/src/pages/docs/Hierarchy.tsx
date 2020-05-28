import React from 'react';
import HierarchyReadme from '!!raw-loader!../../../../vx-hierarchy/Readme.md';
import Cluster from '../../../../vx-hierarchy/src/hierarchies/Cluster';
import Pack from '../../../../vx-hierarchy/src/hierarchies/Pack';
import Partition from '../../../../vx-hierarchy/src/hierarchies/Partition';
import Tree from '../../../../vx-hierarchy/src/hierarchies/Tree';
import Treemap from '../../../../vx-hierarchy/src/hierarchies/Treemap';
import DocPage from '../../components/DocPage';
import PackTile from '../../components/Gallery/PackTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import DendrogramsTile from '../../components/Gallery/DendrogramsTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';
import TreesTile from '../../components/Gallery/TreesTile';

const components = [Cluster, Pack, Partition, Tree, Treemap];

const examples = [PackTile, TreemapTile, DendrogramsTile, LinkTypesTile, TreesTile];

export default () => (
  <DocPage
    components={components}
    examples={examples}
    readme={HierarchyReadme}
    vxPackage="hierarchy"
  />
);
