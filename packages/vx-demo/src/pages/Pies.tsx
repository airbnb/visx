import React from 'react';
import Show from '../components/Show';
import Pies from '../components/tiles/Pies';
import PiesSource from '!!raw-loader!../components/tiles/Pies';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80,
      }}
      component={Pies}
      title="Pies"
    >
      {PiesSource}
    </Show>
  );
};
