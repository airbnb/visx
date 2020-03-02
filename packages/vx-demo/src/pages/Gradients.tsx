import React from 'react';
import Show from '../components/Show';
import Gradients from '../components/tiles/Gradients';
import GradientsSource from '!!raw-loader!../components/tiles/Gradients';

export default () => {
  return (
    <Show
      component={Gradients}
      title="Gradients"
      shadow
      margin={{
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {GradientsSource}
    </Show>
  );
};
