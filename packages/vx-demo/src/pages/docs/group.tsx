import React from 'react';
import GroupReadme from '!!raw-loader!../../../../vx-group/Readme.md';
import Group from '../../../../vx-group/src/Group';
import DocPage from '../../components/DocPage';
import PatternsTile from '../../components/Gallery/PatternsTile';
import RadarTile from '../../components/Gallery/RadarTile';
import PiesTile from '../../components/Gallery/PiesTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import LineRadialTile from '../../components/Gallery/LineRadialTile';

const components = [Group];

const examples = [PatternsTile, RadarTile, PiesTile, TreemapTile, StatsPlotTile, LineRadialTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GroupReadme} vxPackage="group" />
);
