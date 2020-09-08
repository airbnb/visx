import React from 'react';
import Show from '../components/Show';
import Treemap from '../sandboxes/vx-treemap/Example';
import TreemapSource from '!!raw-loader!../sandboxes/vx-treemap/Example';
import packageJson from '../sandboxes/vx-treemap/package.json';

export default () => (
  <Show
    component={Treemap}
    title="Treemap"
    codeSandboxDirectoryName="vx-treemap"
    packageJson={packageJson}
  >
    {TreemapSource}
  </Show>
);
