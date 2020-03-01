import React from 'react';
import Show from '../components/Show';
import Axis from '../components/tiles/Axis';
import AxisSource from '!!raw-loader!../components/tiles/Axis';

export default () => {
  return (
    <Show
      component={Axis}
      title="Axis"
      margin={{
        top: 20,
        left: 70,
        right: 70,
        bottom: 60,
      }}
    >
      {AxisSource}
    </Show>
  );
};
