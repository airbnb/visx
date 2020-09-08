import React from 'react';
import Show from '../components/Show';
import BarGroup from '../sandboxes/vx-bargroup/Example';
import BarGroupSource from '!!raw-loader!../sandboxes/vx-bargroup/Example';
import packageJson from '../sandboxes/vx-bargroup/package.json';

export default () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 80, left: 0 }}
    component={BarGroup}
    title="Bar Group"
    codeSandboxDirectoryName="vx-bargroup"
    packageJson={packageJson}
  >
    {BarGroupSource}
  </Show>
);
