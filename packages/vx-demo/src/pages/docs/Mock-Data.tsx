import React from 'react';
import MockDataReadme from '!!raw-loader!../../../../vx-mock-data/Readme.md';
import DocPage from '../../components/DocPage';
import PackTile from '../../components/Gallery/PackTile';
import TreemapTile from '../../components/Gallery/TreemapTile';
import PiesTile from '../../components/Gallery/PiesTile';
import ChordTile from '../../components/Gallery/ChordTile';
import CurvesTile from '../../components/Gallery/CurvesTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

const examples = [PackTile, TreemapTile, PiesTile, ChordTile, CurvesTile, StatsPlotTile];

export default () => <DocPage examples={examples} readme={MockDataReadme} vxPackage="mock-data" />;
