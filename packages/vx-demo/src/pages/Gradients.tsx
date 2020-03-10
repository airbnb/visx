import React from 'react';
import Show from '../components/Show';
import Gradients from '../docs-v2/examples/vx-gradient/Example';
import GradientsSource from '!!raw-loader!../docs-v2/examples/vx-gradient/Example';

export default () => (
  <Show shadow component={Gradients} title="Gradients" codeSandboxDirectoryName="vx-gradient">
    {GradientsSource}
  </Show>
);
