import React from 'react';
import Show from '../components/Show';
import LineRadial from '../components/tiles/LineRadial';
import LineRadialSource from '!!raw-loader!../components/tiles/LineRadial';

export default () => {
  return (
    <Show component={LineRadial} title="Line Radial">
      {LineRadialSource}
    </Show>
  );
};
