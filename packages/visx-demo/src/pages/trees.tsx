import React from 'react';
import Show from '../components/Show';
import Trees from '../sandboxes/visx-tree/Example';
import TreesSource from '!!raw-loader!../sandboxes/visx-tree/Example';
import packageJson from '../sandboxes/visx-tree/package.json';

const TreesPage = () => (
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
export default TreesPage;
