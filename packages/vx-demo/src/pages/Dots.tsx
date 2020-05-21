import React from 'react';
import Show from '../components/Show';
import Dots from '../docs-v2/examples/vx-dots/Example';
import DotsSource from '!!raw-loader!../docs-v2/examples/vx-dots/Example';

export default () => (
  <Show component={Dots} title="Dots" codeSandboxDirectoryName="vx-dots">
    {DotsSource}
  </Show>
);
