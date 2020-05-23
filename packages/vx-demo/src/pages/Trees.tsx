import React from 'react';
import Show from '../components/Show';
import Trees from '../sandboxes/vx-tree/Example';
import TreesSource from '!!raw-loader!../sandboxes/vx-tree/Example';

export default () => (
  <Show events title="Trees" component={Trees} codeSandboxDirectoryName="vx-tree">
    {TreesSource}
  </Show>
);
