import React from 'react';
import Show from '../components/Show';
import ZoomI from '../sandboxes/visx-zoom-i/Example';
import ZoomISource from '!!raw-loader!../sandboxes/visx-zoom-i/Example';
import packageJson from '../sandboxes/visx-zoom-i/package.json';

export default () => (
  <Show
    component={ZoomI}
    title="Zoom I"
    codeSandboxDirectoryName="visx-zoom-i"
    packageJson={packageJson}
  >
    {ZoomISource}
  </Show>
);
