import React from 'react';
import Show from '../components/Show';
import Legends from '../docs-v2/examples/vx-legend/Example';
import LegendsSource from '!!raw-loader!../docs-v2/examples/vx-legend/Example';

export default () => {
  return (
    <Show events component={Legends} title="Legends" codeSandboxDirectoryName="vx-legend">
      {LegendsSource}
    </Show>
  );
};
