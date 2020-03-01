import React from 'react';
import Show from '../components/Show';
import Brush from '../components/tiles/Brush';
import BrushSource from '!!raw-loader!../components/tiles/Brush';

export default () => {
  return (
    <Show
      component={Brush}
      title="Brush"
      margin={{
        top: 50,
        left: 50,
        right: 20,
        bottom: 50,
      }}
    >
      {BrushSource}
    </Show>
  );
};
