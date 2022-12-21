import React from 'react';
import DragII from '../sandboxes/visx-drag-ii/Example';
import packageJson from '../sandboxes/visx-drag-ii/package.json';
import Show from '../components/Show';
import DragIISource from '!!raw-loader!../sandboxes/visx-drag-ii/Example';

function DragIIPage() {
  return (
    <Show
      component={DragII}
      title="Drag II"
      codeSandboxDirectoryName="visx-drag-ii"
      packageJson={packageJson}
    >
      {DragIISource}
    </Show>
  );
}
export default DragIIPage;
