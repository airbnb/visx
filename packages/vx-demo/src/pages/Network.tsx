import React from 'react';
import Show from '../components/Show';
import Network from '../sandboxes/vx-network/Example';
import NetworkSource from '!!raw-loader!../sandboxes/vx-network/Example';

export default () => (
  <Show component={Network} title="Network" codeSandboxDirectoryName="vx-network">
    {NetworkSource}
  </Show>
);
