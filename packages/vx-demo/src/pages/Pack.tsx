import React from 'react';
import Show from '../components/Show';
import Pack from '../docs-v2/examples/vx-pack/Example';
import PackSource from '!!raw-loader!../docs-v2/examples/vx-pack/Example';

export default () => (
  <Show component={Pack} title="Pack" codeSandboxDirectoryName="vx-pack">
    {PackSource}
  </Show>
);
