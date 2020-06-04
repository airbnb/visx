import React from 'react';
import AxisReadme from '!!raw-loader!../../../../vx-axis/Readme.md';
import Axis from '../../../../vx-axis/src/axis/Axis';
import AxisBottom from '../../../../vx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../vx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../vx-axis/src/axis/AxisRight';
import AxisTop from '../../../../vx-axis/src/axis/AxisTop';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [Axis, AxisBottom, AxisLeft, AxisRight, AxisTop];

const examples = [AxisTile, BarStackTile, ThresholdTile];

export default () => (
  <DocPage components={components} examples={examples} readme={AxisReadme} vxPackage="axis" />
);
