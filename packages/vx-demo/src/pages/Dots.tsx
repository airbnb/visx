import React from 'react';
import Show from '../components/Show';
import Dots from '../sandboxes/vx-dots/Example';
import DotsSource from '!!raw-loader!../sandboxes/vx-dots/Example';

export default () => (
  <Show component={Dots} title="Dots" codeSandboxDirectoryName="vx-dots">
    {DotsSource}
  </Show>
);
