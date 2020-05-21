import React from 'react';
import Show from '../components/Show';
import Trees from '../docs-v2/examples/vx-tree/Example';
import TreesSource from '!!raw-loader!../docs-v2/examples/vx-tree/Example';

export default () => (
  <Show events title="Trees" component={Trees} codeSandboxDirectoryName="vx-tree">
    {TreesSource}
  </Show>
);
