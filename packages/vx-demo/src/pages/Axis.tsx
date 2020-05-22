import React from 'react';
import Show from '../components/Show';
import Axis from '../sandboxes/vx-axis/Example';
import AxisSource from '!!raw-loader!../sandboxes/vx-axis/Example';

export default () => {
  return (
    <Show component={Axis} title="Axis" codeSandboxDirectoryName="vx-axis">
      {AxisSource}
    </Show>
  );
};
