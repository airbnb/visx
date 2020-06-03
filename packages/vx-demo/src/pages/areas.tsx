import React from 'react';
import Show from '../components/Show';
import Area from '../sandboxes/vx-area/Example';
import AreaSource from '!!raw-loader!../sandboxes/vx-area/Example';
import packageJson from '../sandboxes/vx-area/package.json';

export default () => (
  <Show component={Area} title="Areas" codeSandboxDirectoryName="vx-area" packageJson={packageJson}>
    {AreaSource}
  </Show>
);
