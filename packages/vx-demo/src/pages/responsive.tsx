import React from 'react';
import Show from '../components/Show';
import Responsive from '../sandboxes/vx-responsive/Example';
import ResponsiveSource from '!!raw-loader!../sandboxes/vx-responsive/Example';
import packageJson from '../sandboxes/vx-responsive/package.json';

export default () => (
  <Show
    component={Responsive}
    title="Responsive"
    codeSandboxDirectoryName="vx-responsive"
    packageJson={packageJson}
  >
    {ResponsiveSource}
  </Show>
);
