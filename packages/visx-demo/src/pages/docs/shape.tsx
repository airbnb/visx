import React from 'react';
import ShapeReadme from '!!raw-loader!../../../../visx-shape/Readme.md';
import * as Shapes from '../../../../visx-shape/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import LineRadialTile from '../../components/Gallery/LineRadialTile';
import PiesTile from '../../components/Gallery/PiesTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';
import StackedAreasTile from '../../components/Gallery/StackedAreasTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import BarGroupTile from '../../components/Gallery/BarGroupTile';
import RadarTile from '../../components/Gallery/RadarTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('shape', Shapes);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  // @ts-expect-errorTS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-expect-errorTS doesn't know about docgenInfo
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

function ShapeDocs() {
  return (
    <DocPage components={components} examples={examples} readme={ShapeReadme} visxPackage="shape" />
  );
}
export default ShapeDocs;
