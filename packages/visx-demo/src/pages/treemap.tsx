import React from 'react';
import Show from '../components/Show';
import Treemap from '../sandboxes/visx-treemap/Example';
import TreemapSource from '!!raw-loader!../sandboxes/visx-treemap/Example';
import packageJson from '../sandboxes/visx-treemap/package.json';

const TreemapPage = () => (
  <Show
    component={Treemap}
    title="Treemap"
    codeSandboxDirectoryName="visx-treemap"
    packageJson={packageJson}
  >
    {TreemapSource}
  </Show>
);
export default TreemapPage;
