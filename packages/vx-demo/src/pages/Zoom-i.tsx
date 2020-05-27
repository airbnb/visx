import React from 'react';
import Show from '../components/Show';
import ZoomI from '../sandboxes/vx-zoom-i/Example';
import ZoomISource from '!!raw-loader!../sandboxes/vx-zoom-i/Example';
import packageJson from '../sandboxes/vx-zoom-i/package.json';

export default () => (
  <Show
    component={ZoomI}
    title="Zoom I"
    codeSandboxDirectoryName="vx-zoom-i"
    packageJson={packageJson}
  >
    {ZoomISource}
  </Show>
);
