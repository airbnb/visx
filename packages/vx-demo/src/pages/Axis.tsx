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
        top: 50,
        right: 150,
        bottom: 50,
        left: 50,
      }}
    >
      {AxisSource}
    </Show>
  );
};
