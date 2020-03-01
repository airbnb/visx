import React from 'react';
import Show from '../components/Show';
import DragI from '../components/tiles/Drag-i';
import DragISource from '!!raw-loader!../components/tiles/Drag-i';

export default () => {
  return (
    <Show component={DragI} title="Drag I">
      {DragISource}
    </Show>
  );
};
