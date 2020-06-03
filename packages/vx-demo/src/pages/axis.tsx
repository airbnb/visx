import React from 'react';
import Show from '../components/Show';
import Axis from '../sandboxes/vx-axis/Example';
import AxisSource from '!!raw-loader!../sandboxes/vx-axis/Example';
import packageJson from '../sandboxes/vx-axis/package.json';

export default () => (
  <Show component={Axis} title="Axis" codeSandboxDirectoryName="vx-axis" packageJson={packageJson}>
    {AxisSource}
  </Show>
);
