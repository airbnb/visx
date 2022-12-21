import React from 'react';
import Treemap from '../sandboxes/visx-treemap/Example';
import packageJson from '../sandboxes/visx-treemap/package.json';
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
