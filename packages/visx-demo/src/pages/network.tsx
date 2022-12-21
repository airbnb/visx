import React from 'react';
import Network from '../sandboxes/visx-network/Example';
import packageJson from '../sandboxes/visx-network/package.json';
import Show from '../components/Show';
import NetworkSource from '!!raw-loader!../sandboxes/visx-network/Example';

function NetworkPage() {
  return (
    <Show
      component={Network}
      title="Network"
      codeSandboxDirectoryName="visx-network"
      packageJson={packageJson}
    >
      {NetworkSource}
    </Show>
  );
}
export default NetworkPage;
