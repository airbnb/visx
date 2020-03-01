import React from 'react';
import Show from '../components/Show';
import ZoomI from '../components/tiles/Zoom-i';
import ZoomISource from '!!raw-loader!../components/tiles/Zoom-i';

export default () => {
  return (
    <Show component={ZoomI} title="Zoom I">
      {ZoomISource}
    </Show>
  );
};
