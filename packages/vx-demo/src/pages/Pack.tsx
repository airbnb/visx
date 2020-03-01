import React from 'react';
import Show from '../components/Show';
import Pack from '../components/tiles/Pack';
import PackSource from '!!raw-loader!../components/tiles/Pack';

export default () => {
  return (
    <Show component={Pack} title="Pack">
      {PackSource}
    </Show>
  );
};
