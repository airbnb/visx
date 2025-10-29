import React from 'react';
import VoronoiReadme from '!!raw-loader!../../../../visx-voronoi/Readme.md';
import * as VoronoiComponents from '../../../../visx-voronoi/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import VoronoiTile from '../../components/Gallery/VoronoiTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('voronoi', VoronoiComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [VoronoiTile];

function VoronoiDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={VoronoiReadme}
      visxPackage="voronoi"
    />
  );
}
export default VoronoiDocs;
