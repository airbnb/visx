import React from 'react';
import AxisReadme from '!!raw-loader!../../../../vx-axis/Readme.md';
import Axis from '../../../../vx-axis/src/axis/Axis';
import AxisBottom from '../../../../vx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../vx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../vx-axis/src/axis/AxisRight';
import AxisTop from '../../../../vx-axis/src/axis/AxisTop';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Axis.__docgenInfo,
  // @ts-ignore
  AxisBottom.__docgenInfo,
  // @ts-ignore
  AxisLeft.__docgenInfo,
  // @ts-ignore
  AxisRight.__docgenInfo,
  // @ts-ignore
  AxisTop.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={AxisReadme} vxPackage="axis" />;
