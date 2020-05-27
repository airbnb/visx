import React from 'react';
import Show from '../components/Show';
import Legends from '../sandboxes/vx-legend/Example';
import LegendsSource from '!!raw-loader!../sandboxes/vx-legend/Example';
import packageJson from '../sandboxes/vx-legend/package.json';

export default () => {
  return (
    <Show
      events
      component={Legends}
      title="Legends"
      codeSandboxDirectoryName="vx-legend"
      packageJson={packageJson}
    >
      {LegendsSource}
    </Show>
  );
};
