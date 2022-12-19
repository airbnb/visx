import React from 'react';
import ZoomI from '../sandboxes/visx-zoom-i/Example';
import packageJson from '../sandboxes/visx-zoom-i/package.json';
import Show from '../components/Show';
import ZoomISource from '!!raw-loader!../sandboxes/visx-zoom-i/Example';

function ZoomIPage() {
  return (
    <Show
      component={ZoomI}
      title="Zoom I"
      codeSandboxDirectoryName="visx-zoom-i"
      packageJson={packageJson}
    >
      {ZoomISource}
    </Show>
  );
}
export default ZoomIPage;
