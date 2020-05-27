import React from 'react';
import Show from '../components/Show';
import Pack from '../sandboxes/vx-pack/Example';
import PackSource from '!!raw-loader!../sandboxes/vx-pack/Example';
import packageJson from '../sandboxes/vx-pack/package.json';

export default () => (
  <Show component={Pack} title="Pack" codeSandboxDirectoryName="vx-pack" packageJson={packageJson}>
    {PackSource}
  </Show>
);
