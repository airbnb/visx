import React from 'react';
import HierarchyReadme from '!!raw-loader!../../../../visx-hierarchy/Readme.md';
import * as HierarchyComponents from '../../../../visx-hierarchy/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import PackTile from '../../components/Gallery/PackTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import DendrogramsTile from '../../components/Gallery/DendrogramsTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';
import TreesTile from '../../components/Gallery/TreesTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('hierarchy', HierarchyComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [PackTile, TreemapTile, DendrogramsTile, LinkTypesTile, TreesTile];

function HierarchyDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={HierarchyReadme}
      visxPackage="hierarchy"
    />
  );
}
export default HierarchyDocs;
