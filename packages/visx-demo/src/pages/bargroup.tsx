import React from 'react';
import Show from '../components/Show';
import BarGroup from '../sandboxes/visx-bargroup/Example';
import BarGroupSource from '!!raw-loader!../sandboxes/visx-bargroup/Example';
import packageJson from '../sandboxes/visx-bargroup/package.json';

const BarGroupPage = () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 80, left: 0 }}
    component={BarGroup}
    title="Bar Group"
    codeSandboxDirectoryName="visx-bargroup"
    packageJson={packageJson}
  >
    {BarGroupSource}
  </Show>
);
export default BarGroupPage;
