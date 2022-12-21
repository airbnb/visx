import React from 'react';
import Axis from '../sandboxes/visx-axis/Example';
import packageJson from '../sandboxes/visx-axis/package.json';
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
