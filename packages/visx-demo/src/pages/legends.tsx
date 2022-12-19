import React from 'react';
import Legends from '@visx/demo-legend/Example';
import packageJson from '@visx/demo-legend/package.json';
import Show from '../components/Show';
import LegendsSource from '!!raw-loader!../sandboxes/visx-legend/Example';

function LegendsPage() {
  return (
    <Show
      events
      component={Legends}
      title="Legends"
      codeSandboxDirectoryName="visx-legend"
      packageJson={packageJson}
    >
      {LegendsSource}
    </Show>
  );
}
export default LegendsPage;
