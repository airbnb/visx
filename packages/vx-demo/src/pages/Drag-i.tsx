import React from 'react';
import Show from '../components/Show';
import DragI from '../docs-v2/examples/vx-drag-i/Example';
import DragISource from '!!raw-loader!../docs-v2/examples/vx-drag-i/Example';

export default () => {
  return (
    <Show component={DragI} title="Drag I" codeSandboxDirectoryName="vx-drag-i">
      {DragISource}
    </Show>
  );
};
