import React from 'react';
import Show from '../components/Show';
import BarStackHorizontal from '../components/tiles/BarStackHorizontal';
import BarStackHorizontalSource from '!!raw-loader!../components/tiles/BarStackHorizontal';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 80,
        left: 80,
        right: 40,
        bottom: 100,
      }}
      component={BarStackHorizontal}
      title="Bar Stack Horizontal"
    >
      {BarStackHorizontalSource}
    </Show>
  );
};
