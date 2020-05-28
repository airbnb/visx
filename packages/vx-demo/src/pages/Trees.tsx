import React from 'react';
import Show from '../components/Show';
import Trees from '../sandboxes/vx-tree/Example';
import TreesSource from '!!raw-loader!../sandboxes/vx-tree/Example';
import packageJson from '../sandboxes/vx-tree/package.json';

export default () => (
  <Show
    events
    title="Trees"
    component={Trees}
    codeSandboxDirectoryName="vx-tree"
    packageJson={packageJson}
  >
    {TreesSource}
  </Show>
);
