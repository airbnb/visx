import React from 'react';
import DragI from '../sandboxes/visx-drag-i/Example';
import packageJson from '../sandboxes/visx-drag-i/package.json';
import Show from '../components/Show';
import DragISource from '!!raw-loader!../sandboxes/visx-drag-i/Example';

function DragIPage() {
  return (
    <Show
      component={DragI}
      title="Drag I"
      codeSandboxDirectoryName="visx-drag-i"
      packageJson={packageJson}
    >
      {DragISource}
    </Show>
  );
}
export default DragIPage;
