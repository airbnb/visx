import React from 'react';
import Show from '../components/Show';
import Pies from '../sandboxes/vx-shape-pie/Example';
import PiesSource from '!!raw-loader!../sandboxes/vx-shape-pie/Example';
import packageJson from '../sandboxes/vx-shape-pie/package.json';

export default () => (
  <Show
    component={Pies}
    title="Pies"
    codeSandboxDirectoryName="vx-shape-pie"
    packageJson={packageJson}
  >
    {PiesSource}
  </Show>
);
