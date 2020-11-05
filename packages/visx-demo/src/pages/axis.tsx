import React from 'react';
import Show from '../components/Show';
import Axis from '../sandboxes/visx-axis/Example';
import AxisSource from '!!raw-loader!../sandboxes/visx-axis/Example';
import packageJson from '../sandboxes/visx-axis/package.json';

const AxisPage = () => (
  <Show
    component={Axis}
    title="Axis"
    codeSandboxDirectoryName="visx-axis"
    packageJson={packageJson}
  >
    {AxisSource}
  </Show>
);
export default AxisPage;
