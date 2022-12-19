import React from 'react';
import Axis from '@visx/demo-axis/Example';
import packageJson from '@visx/demo-axis/package.json';
import Show from '../components/Show';
import AxisSource from '!!raw-loader!../sandboxes/visx-axis/Example';

function AxisPage() {
  return (
    <Show
      component={Axis}
      title="Axis"
      codeSandboxDirectoryName="visx-axis"
      packageJson={packageJson}
    >
      {AxisSource}
    </Show>
  );
}
export default AxisPage;
