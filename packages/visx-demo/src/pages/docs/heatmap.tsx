import React from 'react';
import HeatmapReadme from '!!raw-loader!../../../../visx-heatmap/Readme.md';
import * as HeatmapComponents from '../../../../visx-heatmap/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import HeatmapsTile from '../../components/Gallery/HeatmapsTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('heatmap', HeatmapComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [HeatmapsTile];

function HeatmapDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={HeatmapReadme}
      visxPackage="heatmap"
    />
  );
}
export default HeatmapDocs;
