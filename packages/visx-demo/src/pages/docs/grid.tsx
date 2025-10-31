import React from 'react';
import GridReadme from '!!raw-loader!../../../../visx-grid/Readme.md';
import * as GridComponents from '../../../../visx-grid/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';
import LineRadialTile from '../../components/Gallery/LineRadialTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('grid', GridComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [AxisTile, BarStackTile, ThresholdTile, LineRadialTile];

function GridDocs() {
  return (
    <DocPage components={components} examples={examples} readme={GridReadme} visxPackage="grid" />
  );
}
export default GridDocs;
