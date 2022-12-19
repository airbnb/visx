import React from 'react';
import Trees from '@visx/demo-tree/Example';
import packageJson from '@visx/demo-tree/package.json';
import Show from '../components/Show';
import TreesSource from '!!raw-loader!../sandboxes/visx-tree/Example';

function TreesPage() {
  return (
    <Show
      events
      title="Trees"
      component={Trees}
      codeSandboxDirectoryName="visx-tree"
      packageJson={packageJson}
    >
      {TreesSource}
    </Show>
  );
}
export default TreesPage;
