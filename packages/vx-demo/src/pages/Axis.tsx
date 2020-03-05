import React from 'react';
import Show from '../components/Show';
import Axis from '../docs-v2/examples/vx-axis/Example';
import AxisSource from '!!raw-loader!../docs-v2/examples/vx-axis/Example';

export default () => {
  return (
    <Show component={Axis} title="Axis">
      {AxisSource}
    </Show>
  );
};
