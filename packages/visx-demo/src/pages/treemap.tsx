import React from 'react';
import Treemap from '@visx/demo-treemap/Example';
import packageJson from '@visx/demo-treemap/package.json';
import Show from '../components/Show';
import TreemapSource from '!!raw-loader!../sandboxes/visx-treemap/Example';

function TreemapPage() {
  return (
    <Show
      component={Treemap}
      title="Treemap"
      codeSandboxDirectoryName="visx-treemap"
      packageJson={packageJson}
    >
      {TreemapSource}
    </Show>
  );
}
export default TreemapPage;
