import React from 'react';
import Show from '../components/Show';
import Dots from '../sandboxes/vx-dots/Example';
import DotsSource from '!!raw-loader!../sandboxes/vx-dots/Example';
import packageJson from '../sandboxes/vx-dots/package.json';

export default () => (
  <Show component={Dots} title="Dots" codeSandboxDirectoryName="vx-dots" packageJson={packageJson}>
    {DotsSource}
  </Show>
);
