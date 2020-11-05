import React from 'react';
import Show from '../components/Show';
import Legends from '../sandboxes/visx-legend/Example';
import LegendsSource from '!!raw-loader!../sandboxes/visx-legend/Example';
import packageJson from '../sandboxes/visx-legend/package.json';

const LegendsPage = () => {
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
};
export default LegendsPage;
