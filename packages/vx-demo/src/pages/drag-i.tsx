import React from 'react';
import Show from '../components/Show';
import DragI from '../sandboxes/vx-drag-i/Example';
import DragISource from '!!raw-loader!../sandboxes/vx-drag-i/Example';
import packageJson from '../sandboxes/vx-drag-i/package.json';

export default () => {
  return (
    <Show
      component={DragI}
      title="Drag I"
      codeSandboxDirectoryName="vx-drag-i"
      packageJson={packageJson}
    >
      {DragISource}
    </Show>
  );
};
