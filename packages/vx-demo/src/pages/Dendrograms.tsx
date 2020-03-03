import React from 'react';
import Show from '../components/Show';
import Dendrograms from '../components/tiles/Dendrograms';
import DendrogramsSource from '!!raw-loader!../components/tiles/Dendrograms';

export default () => {
  return (
    <Show
      events
      title="Dendrograms"
      component={Dendrograms}
      margin={{
        top: 80,
        left: 10,
        right: 10,
        bottom: 80,
      }}
    >
      {DendrogramsSource}
    </Show>
  );
};
