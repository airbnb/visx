import React from 'react';
import Show from '../components/Show';
import Bars from '../components/tiles/Bars';
import BarsSource from '!!raw-loader!../components/tiles/Bars';

export default () => {
  return (
    <Show events component={Bars} title="Bars">
      {BarsSource}
    </Show>
  );
};
