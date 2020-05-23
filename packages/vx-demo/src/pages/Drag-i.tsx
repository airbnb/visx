import React from 'react';
import Show from '../components/Show';
import DragI from '../sandboxes/vx-drag-i/Example';
import DragISource from '!!raw-loader!../sandboxes/vx-drag-i/Example';

export default () => {
  return (
    <Show component={DragI} title="Drag I" codeSandboxDirectoryName="vx-drag-i">
      {DragISource}
    </Show>
  );
};
