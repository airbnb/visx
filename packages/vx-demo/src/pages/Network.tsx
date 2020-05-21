import React from 'react';
import Show from '../components/Show';
import Network from '../docs-v2/examples/vx-network/Example';
import NetworkSource from '!!raw-loader!../docs-v2/examples/vx-network/Example';

export default () => (
  <Show component={Network} title="Network" codeSandboxDirectoryName="vx-network">
    {NetworkSource}
  </Show>
);
