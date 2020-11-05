import React from 'react';
import HeatmapReadme from '!!raw-loader!../../../../visx-heatmap/Readme.md';
import HeatmapRect from '../../../../visx-heatmap/src/heatmaps/HeatmapRect';
import HeatmapCircle from '../../../../visx-heatmap/src/heatmaps/HeatmapCircle';
import DocPage from '../../components/DocPage';
import HeatmapsTile from '../../components/Gallery/HeatmapsTile';

const components = [HeatmapRect, HeatmapCircle];

const examples = [HeatmapsTile];

const HeatmapDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={HeatmapReadme}
    visxPackage="heatmap"
  />
);
export default HeatmapDocs;
