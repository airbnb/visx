import React from 'react';
import Show from '../components/Show';
import BarStack from '../docs-v2/examples/vx-barstack/Example';
import BarStackSource from '!!raw-loader!../docs-v2/examples/vx-barstack/Example';

export default () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
    component={BarStack}
    title="Bar Stack"
    codeSandboxDirectoryName="vx-barstack"
  >
    {BarStackSource}
  </Show>
);
