import React from 'react';
import Show from '../components/Show';
import DragII from '../components/tiles/Drag-ii';
import DragIISource from '!!raw-loader!../components/tiles/Drag-ii';

export default () => {
  return (
    <Show component={DragII} title="Drag II">
      {DragIISource}
    </Show>
  );
};
