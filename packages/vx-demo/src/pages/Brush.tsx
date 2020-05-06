import React from 'react';
import Show from '../components/Show';
import Brush from '../docs-v2/examples/vx-brush/Example';
import BrushSource from '!!raw-loader!../docs-v2/examples/vx-brush/Example';

export default () => (
  <Show
    component={Brush}
    title="Brush"
    margin={{
      top: 50,
      left: 50,
      right: 20,
      bottom: 50,
    }}
    codeSandboxDirectoryName="vx-brush"
  >
    {BrushSource}
  </Show>
);
