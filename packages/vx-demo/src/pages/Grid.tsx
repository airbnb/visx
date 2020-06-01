import React from 'react';
import Show from '../components/Show';
import Grid from '../sandboxes/vx-grid/Example';
import GirdSource from '!!raw-loader!../sandboxes/vx-grid/Example';
import packageJson from '../sandboxes/vx-grid/package.json';

export default () => (
  <Show component={Grid} title="Grid" codeSandboxDirectoryName="vx-grid" packageJson={packageJson}>
    {GirdSource}
  </Show>
);
