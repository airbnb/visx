import React from 'react';
import Show from '../components/Show';
import Legends from '../sandboxes/vx-legend/Example';
import LegendsSource from '!!raw-loader!../sandboxes/vx-legend/Example';

export default () => {
  return (
    <Show events component={Legends} title="Legends" codeSandboxDirectoryName="vx-legend">
      {LegendsSource}
    </Show>
  );
};
