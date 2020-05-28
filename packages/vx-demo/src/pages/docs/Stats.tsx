import React from 'react';
import StatsReadme from '!!raw-loader!../../../../vx-stats/Readme.md';
import BoxPlot from '../../../../vx-stats/src/BoxPlot';
import ViolinPlot from '../../../../vx-stats/src/ViolinPlot';
import DocPage from '../../components/DocPage';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

const components = [BoxPlot, ViolinPlot];

const examples = [StatsPlotTile];

export default () => (
  <DocPage components={components} examples={examples} readme={StatsReadme} vxPackage="stats" />
);
