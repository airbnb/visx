import React from 'react';
import Show from '../components/Show';
import Network from '../sandboxes/visx-network/Example';
import NetworkSource from '!!raw-loader!../sandboxes/visx-network/Example';
import packageJson from '../sandboxes/visx-network/package.json';

export default () => (
  <Show
    component={Network}
    title="Network"
    codeSandboxDirectoryName="visx-network"
    packageJson={packageJson}
  >
    {NetworkSource}
  </Show>
);
