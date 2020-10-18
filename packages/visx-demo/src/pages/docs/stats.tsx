import React from 'react';
import StatsReadme from '!!raw-loader!../../../../visx-stats/Readme.md';
import BoxPlot from '../../../../visx-stats/src/BoxPlot';
import ViolinPlot from '../../../../visx-stats/src/ViolinPlot';
import DocPage from '../../components/DocPage';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

const components = [BoxPlot, ViolinPlot];

const examples = [StatsPlotTile];

const StatsDocs = () => (
  <DocPage components={components} examples={examples} readme={StatsReadme} visxPackage="stats" />
);
export default StatsDocs;
