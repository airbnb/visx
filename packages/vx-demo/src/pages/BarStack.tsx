import React from 'react';
import Show from '../components/Show';
import BarStack from '../components/tiles/BarStack';
import BarStackSource from '!!raw-loader!../components/tiles/BarStack';

export default () => {
  return (
    <Show
      events
      margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
      component={BarStack}
      title="Bar Stack"
    >
      {BarStackSource}
    </Show>
  );
};
