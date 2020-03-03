import React from 'react';
import Show from '../components/Show';
import BarGroupHorizontal from '../components/tiles/BarGroupHorizontal';
import BarGroupHorizontalSource from '!!raw-loader!../components/tiles/BarGroupHorizontal';

export default () => {
  return (
    <Show
      events
      margin={{ top: 45, left: 60, right: 20, bottom: 0 }}
      component={BarGroupHorizontal}
      title="Bar Group Horizontal"
    >
      {BarGroupHorizontalSource}
    </Show>
  );
};
