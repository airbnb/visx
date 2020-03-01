import React from 'react';
import Show from '../components/Show';
import Trees from '../components/tiles/Trees';
import TreesSource from '!!raw-loader!../components/tiles/Trees';

export default () => {
  return (
    <Show
      events
      title="Trees"
      component={Trees}
      margin={{
        top: 0,
        left: 80,
        right: 80,
        bottom: 10,
      }}
    >
      {TreesSource}
    </Show>
  );
};
