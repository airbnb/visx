import React from 'react';
import AxisReadme from '!!raw-loader!../../../../visx-axis/Readme.md';
import * as AxisComponents from '../../../../visx-axis/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('axis', AxisComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [AxisTile, BarStackTile, ThresholdTile];

function AxisDocs() {
  return (
    <DocPage components={components} examples={examples} readme={AxisReadme} visxPackage="axis" />
  );
}
export default AxisDocs;
