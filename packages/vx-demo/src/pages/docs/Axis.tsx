import React from 'react';
import AxisReadme from '!!raw-loader!../../../../vx-axis/Readme.md';
import Axis from '../../../../vx-axis/src/axis/Axis';
import AxisBottom from '../../../../vx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../vx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../vx-axis/src/axis/AxisRight';
import AxisTop from '../../../../vx-axis/src/axis/AxisTop';
import DocPage from '../../components/DocPage';

const components = [Axis, AxisBottom, AxisLeft, AxisRight, AxisTop];

export default () => <DocPage components={components} readme={AxisReadme} vxPackage="axis" />;
