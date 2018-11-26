import React from 'react';
import Show from '../components/show';
import BarStackHorizontal from '../components/tiles/barstackhorizontal';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 80,
        left: 80,
        right: 40,
        bottom: 100
      }}
      component={BarStackHorizontal}
      title="Bar Stack Horizontal"
    >
      {``}
    </Show>
  );
};
