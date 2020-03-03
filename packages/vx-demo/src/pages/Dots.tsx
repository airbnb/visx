import React from 'react';
import Show from '../components/Show';
import Dots from '../components/tiles/Dots';
import DotsSource from '!!raw-loader!../components/tiles/Dots';

export default () => {
  return (
    <Show component={Dots} title="Dots">
      {DotsSource}
    </Show>
  );
};
