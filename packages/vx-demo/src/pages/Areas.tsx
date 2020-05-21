import React from 'react';
import Show from '../components/Show';
import Area from '../docs-v2/examples/vx-area/Example';
import AreaSource from '!!raw-loader!../docs-v2/examples/vx-area/Example';

export default () => (
  <Show component={Area} title="Areas" codeSandboxDirectoryName="vx-area">
    {AreaSource}
  </Show>
);
