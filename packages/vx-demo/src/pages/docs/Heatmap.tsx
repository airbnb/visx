import React from 'react';
import HeatmapReadme from '!!raw-loader!../../../../vx-heatmap/Readme.md';
import HeatmapRect from '../../../../vx-heatmap/src/heatmaps/HeatmapRect';
import HeatmapCircle from '../../../../vx-heatmap/src/heatmaps/HeatmapCircle';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  HeatmapRect.__docgenInfo,
  // @ts-ignore
  HeatmapCircle.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={HeatmapReadme} vxPackage="heatmap" />;
