import React from 'react';
import Show from '../components/Show';
import BarGroupHorizontal from '../sandboxes/visx-bargroup-horizontal/Example';
import BarGroupHorizontalSource from '!!raw-loader!../sandboxes/visx-bargroup-horizontal/Example';
import packageJson from '../sandboxes/visx-bargroup-horizontal/package.json';

const BarGroupHorizontalPage = () => (
  <Show
    events
    margin={{ top: 45, left: 60, right: 20, bottom: 45 }}
    component={BarGroupHorizontal}
    title="Bar Group Horizontal"
    codeSandboxDirectoryName="visx-bargroup-horizontal"
    packageJson={packageJson}
  >
    {BarGroupHorizontalSource}
  </Show>
);
export default BarGroupHorizontalPage;
