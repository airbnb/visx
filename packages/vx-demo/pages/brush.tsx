import React from 'react';
import Show from '../components/Show';
import Brush from '../sandboxes/vx-brush/Example';
import BrushSource from '!!raw-loader!../sandboxes/vx-brush/Example';
import packageJson from '../sandboxes/vx-brush/package.json';

export default () => (
  <Show
    component={Brush}
    title="Brush"
    margin={{
      top: 40,
      left: 50,
      right: 20,
      bottom: 10,
    }}
    codeSandboxDirectoryName="vx-brush"
    packageJson={packageJson}
  >
    {BrushSource}
  </Show>
);
