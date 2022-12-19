import React from 'react';
import BarGroupHorizontal from '../sandboxes/visx-bargroup-horizontal/Example';
import packageJson from '../sandboxes/visx-bargroup-horizontal/package.json';
import Show from '../components/Show';
import BarGroupHorizontalSource from '!!raw-loader!../sandboxes/visx-bargroup-horizontal/Example';

function BarGroupHorizontalPage() {
  return (
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
}
export default BarGroupHorizontalPage;
