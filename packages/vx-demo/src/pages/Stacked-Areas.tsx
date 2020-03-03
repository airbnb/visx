import React from 'react';
import Show from '../components/Show';
import StackedAreas from '../components/tiles/Stacked-Areas';
import StackedAreasSource from '!!raw-loader!../components/tiles/Stacked-Areas';

export default () => {
  return (
    <Show
      component={StackedAreas}
      title="Stacked Areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      }}
    >
      {StackedAreasSource}
    </Show>
  );
};
