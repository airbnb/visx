import React from 'react';
import Show from '../components/Show';
import Patterns from '../components/tiles/Patterns';
import PatternsSource from '!!raw-loader!../components/tiles/Patterns';

export default () => {
  return (
    <Show
      component={Patterns}
      title="Patterns"
      margin={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
    >
      {PatternsSource}
    </Show>
  );
};
