import React from 'react';
import TooltipReadme from '!!raw-loader!../../../../vx-tooltip/Readme.md';
import DocPage from '../../components/DocPage';
import DotsTile from '../../components/Gallery/DotsTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import AreaTile from '../../components/Gallery/AreaTile';

const examples = [DotsTile, BarStackHorizontalTile, StatsPlotTile, AreaTile];

export default () => <DocPage examples={examples} readme={TooltipReadme} vxPackage="tooltip" />;
