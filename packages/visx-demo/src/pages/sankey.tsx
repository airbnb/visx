import React from 'react';
import Sankey from '../sandboxes/visx-sankey/Example';
import packageJson from '../sandboxes/visx-sankey/package.json';
import Show from '../components/Show';
import TreemapSource from '!!raw-loader!../sandboxes/visx-sankey/Example';

function SankeyPage() {
  return (
    <Show
      component={Sankey}
      title="Sankey"
      codeSandboxDirectoryName="visx-sankey"
      packageJson={packageJson}
    >
      {TreemapSource}
    </Show>
  );
}
export default SankeyPage;
