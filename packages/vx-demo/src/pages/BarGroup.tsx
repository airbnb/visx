import React from 'react';
import Show from '../components/Show';
import BarGroup from '../docs-v2/examples/vx-bargroup/Example';
import BarGroupSource from '!!raw-loader!../docs-v2/examples/vx-bargroup/Example';

export default () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 80, left: 0 }}
    component={BarGroup}
    title="Bar Group"
    codeSandboxDirectoryName="vx-bargroup"
  >
    {BarGroupSource}
  </Show>
);
