import React from 'react';
import Show from '../components/Show';
import Legends from '../components/tiles/Legends';
import LegendsSource from '!!raw-loader!../components/tiles/Legends';

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
      component={Legends}
      title="Legends"
    >
      {LegendsSource}
    </Show>
  );
};
