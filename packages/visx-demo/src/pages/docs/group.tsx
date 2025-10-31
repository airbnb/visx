import React from 'react';
import GroupReadme from '!!raw-loader!../../../../visx-group/Readme.md';
import * as GroupComponents from '../../../../visx-group/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import PatternsTile from '../../components/Gallery/PatternsTile';
import RadarTile from '../../components/Gallery/RadarTile';
import PiesTile from '../../components/Gallery/PiesTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import LineRadialTile from '../../components/Gallery/LineRadialTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('group', GroupComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [PatternsTile, RadarTile, PiesTile, TreemapTile, StatsPlotTile, LineRadialTile];

function GroupDocs() {
  return (
    <DocPage components={components} examples={examples} readme={GroupReadme} visxPackage="group" />
  );
}
export default GroupDocs;
