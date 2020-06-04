import React from 'react';
import Show from '../components/Show';
import BarGroupHorizontal from '../sandboxes/vx-bargroup-horizontal/Example';
import BarGroupHorizontalSource from '!!raw-loader!../sandboxes/vx-bargroup-horizontal/Example';
import packageJson from '../sandboxes/vx-bargroup-horizontal/package.json';

export default () => (
  <Show
    events
    margin={{ top: 45, left: 60, right: 20, bottom: 45 }}
    component={BarGroupHorizontal}
    title="Bar Group Horizontal"
    codeSandboxDirectoryName="vx-bargroup-horizontal"
    packageJson={packageJson}
  >
    {BarGroupHorizontalSource}
  </Show>
);
