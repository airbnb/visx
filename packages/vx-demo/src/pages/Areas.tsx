import React from 'react';
import Show from '../components/Show';
import Areas from '../components/tiles/Areas';
import AreasSource from '!!raw-loader!../components/tiles/Areas';

export default () => {
  return (
    <Show
      component={Areas}
      title="Areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {AreasSource}
    </Show>
  );
};
