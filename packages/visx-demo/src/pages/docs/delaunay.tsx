import React from 'react';
import DelaunayReadme from '!!raw-loader!../../../../visx-delaunay/Readme.md';
import * as DelaunayComponents from '../../../../visx-delaunay/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import DelaunayTriangulationTile from '../../components/Gallery/DelaunayTriangulationTile';
import DelaunayVoronoiTile from '../../components/Gallery/DelaunayVoronoiTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('delaunay', DelaunayComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [DelaunayVoronoiTile, DelaunayTriangulationTile];

function DelaunayDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={DelaunayReadme}
      visxPackage="delaunay"
    />
  );
}
export default DelaunayDocs;
