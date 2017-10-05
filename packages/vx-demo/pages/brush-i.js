import React from 'react';
import Show from '../components/show';
import BrushOne from '../components/tiles/brush-i';

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
      component={BrushOne}
      title="Brush I"
    >
      {``}
    </Show>
  );
};
