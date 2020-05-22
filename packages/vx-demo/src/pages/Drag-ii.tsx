import React from 'react';
import Show from '../components/Show';
import DragII from '../sandboxes/vx-drag-ii/Example';
import DragIISource from '!!raw-loader!../sandboxes/vx-drag-ii/Example';

export default () => {
  return (
    <Show component={DragII} title="Drag II" codeSandboxDirectoryName="vx-drag-ii">
      {DragIISource}
    </Show>
  );
};
