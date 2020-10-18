import React from 'react';
import ScaleReadme from '!!raw-loader!../../../../visx-scale/Readme.md';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import LegendsTile from '../../components/Gallery/LegendsTile';
import BarGroupTile from '../../components/Gallery/BarGroupTile';
import GeoMercatorTile from '../../components/Gallery/GeoMercatorTile';
import LineRadialTile from '../../components/Gallery/LineRadialTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';

const examples = [
  AxisTile,
  LegendsTile,
  LineRadialTile,
  StreamGraphTile,
  BarGroupTile,
  GeoMercatorTile,
];

const ScaleDocs = () => <DocPage examples={examples} readme={ScaleReadme} visxPackage="scale" />;
export default ScaleDocs;
