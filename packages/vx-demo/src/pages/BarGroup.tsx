import React from 'react';
import Show from '../components/Show';
import BarGroup from '../components/tiles/BarGroup';
import BarGroupSource from '!!raw-loader!../components/tiles/BarGroup';

export default () => {
  return (
    <Show
      events
      margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
      component={BarGroup}
      title="Bar Group"
    >
      {BarGroupSource}
    </Show>
  );
};
