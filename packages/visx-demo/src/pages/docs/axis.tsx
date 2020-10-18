import React from 'react';
import AxisReadme from '!!raw-loader!../../../../visx-axis/Readme.md';
import Axis from '../../../../visx-axis/src/axis/Axis';
import AxisBottom from '../../../../visx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../visx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../visx-axis/src/axis/AxisRight';
import AxisTop from '../../../../visx-axis/src/axis/AxisTop';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [Axis, AxisBottom, AxisLeft, AxisRight, AxisTop];

const examples = [AxisTile, BarStackTile, ThresholdTile];

const AxisDocs = () => (
  <DocPage components={components} examples={examples} readme={AxisReadme} visxPackage="axis" />
);
export default AxisDocs;
