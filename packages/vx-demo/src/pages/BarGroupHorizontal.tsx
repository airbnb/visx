import React from 'react';
import Show from '../components/Show';
import BarGroupHorizontal from '../docs-v2/examples/vx-bargroup-horizontal/Example';
import BarGroupHorizontalSource from '!!raw-loader!../docs-v2/examples/vx-bargroup-horizontal/Example';

export default () => (
  <Show
    events
    margin={{ top: 45, left: 60, right: 20, bottom: 0 }}
    component={BarGroupHorizontal}
    title="Bar Group Horizontal"
    codeSandboxDirectoryName="vx-bargroup-horizontal"
  >
    {BarGroupHorizontalSource}
  </Show>
);
