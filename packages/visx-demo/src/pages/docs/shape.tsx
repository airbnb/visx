import React from 'react';
import ShapeReadme from '!!raw-loader!../../../../vx-shape/Readme.md';
import * as Shapes from '../../../../vx-shape/src';
import DocPage from '../../components/DocPage';
import LineRadialTile from '../../components/Gallery/LineRadialTile';
import PiesTile from '../../components/Gallery/PiesTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';
import StackedAreasTile from '../../components/Gallery/StackedAreasTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import BarGroupTile from '../../components/Gallery/BarGroupTile';
import RadarTile from '../../components/Gallery/RadarTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';

const components = Object.values(Shapes).sort((a, b) =>
  // @ts-ignore TS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-ignore TS doesn't know about docgenInfo
    b?.__docgenInfo?.displayName ?? '',
  ),
);

const examples = [
  LineRadialTile,
  PiesTile,
  StreamGraphTile,
  ThresholdTile,
  StackedAreasTile,
  BarStackHorizontalTile,
  BarGroupTile,
  RadarTile,
  LinkTypesTile,
];

export default () => (
  <DocPage components={components} examples={examples} readme={ShapeReadme} vxPackage="shape" />
);
