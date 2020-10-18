import React from 'react';
import HierarchyReadme from '!!raw-loader!../../../../visx-hierarchy/Readme.md';
import Cluster from '../../../../visx-hierarchy/src/hierarchies/Cluster';
import Pack from '../../../../visx-hierarchy/src/hierarchies/Pack';
import Partition from '../../../../visx-hierarchy/src/hierarchies/Partition';
import Tree from '../../../../visx-hierarchy/src/hierarchies/Tree';
import Treemap from '../../../../visx-hierarchy/src/hierarchies/Treemap';
import DocPage from '../../components/DocPage';
import PackTile from '../../components/Gallery/PackTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import DendrogramsTile from '../../components/Gallery/DendrogramsTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';
import TreesTile from '../../components/Gallery/TreesTile';

const components = [Cluster, Pack, Partition, Tree, Treemap];

const examples = [PackTile, TreemapTile, DendrogramsTile, LinkTypesTile, TreesTile];

const HierarchyDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={HierarchyReadme}
    visxPackage="hierarchy"
  />
);
export default HierarchyDocs;
