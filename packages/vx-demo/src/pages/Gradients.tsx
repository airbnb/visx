import React from 'react';
import Show from '../components/Show';
import Gradients from '../sandboxes/vx-gradient/Example';
import GradientsSource from '!!raw-loader!../sandboxes/vx-gradient/Example';
import packageJson from '../sandboxes/vx-gradient/package.json';

export default () => (
  <Show
    shadow
    component={Gradients}
    title="Gradients"
    codeSandboxDirectoryName="vx-gradient"
    packageJson={packageJson}
  >
    {GradientsSource}
  </Show>
);
