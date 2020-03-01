import React from 'react';
import Show from '../components/Show';
import Treemap from '../components/tiles/Treemap';
import TreemapSource from '!!raw-loader!../components/tiles/Treemap';

export default () => {
  return (
    <Show component={Treemap} title="Treemap">
      {TreemapSource}
    </Show>
  );
};
