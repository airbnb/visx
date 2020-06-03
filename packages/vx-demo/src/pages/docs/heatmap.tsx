import React from 'react';
import HeatmapReadme from '!!raw-loader!../../../../vx-heatmap/Readme.md';
import HeatmapRect from '../../../../vx-heatmap/src/heatmaps/HeatmapRect';
import HeatmapCircle from '../../../../vx-heatmap/src/heatmaps/HeatmapCircle';
import DocPage from '../../components/DocPage';
import HeatmapsTile from '../../components/Gallery/HeatmapsTile';

const components = [HeatmapRect, HeatmapCircle];

const examples = [HeatmapsTile];

export default () => (
  <DocPage components={components} examples={examples} readme={HeatmapReadme} vxPackage="heatmap" />
);
