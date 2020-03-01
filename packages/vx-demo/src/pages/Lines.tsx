import React from 'react';
import Show from '../components/Show';
import Lines from '../components/tiles/Lines';
import LinesSource from '!!raw-loader!../components/tiles/Lines';

export default () => {
  return (
    <Show component={Lines} title="Lines">
      {LinesSource}
    </Show>
  );
};
