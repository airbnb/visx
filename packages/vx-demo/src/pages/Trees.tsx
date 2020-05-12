import React from 'react';
import Show from '../components/Show';
import Trees from '../docs-v2/examples/vx-tree/Example';
import TreesSource from '!!raw-loader!../docs-v2/examples/vx-tree/Example';

export default () => (
  <Show
    events
    title="Trees"
    component={Trees}
    codeSandboxDirectoryName="vx-tree"
    margin={{
      top: 0,
      left: 80,
      right: 80,
      bottom: 10,
    }}
  >
    {TreesSource}
  </Show>
);
