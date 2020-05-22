import React from 'react';
import Show from '../components/Show';
import Pies from '../sandboxes/vx-shape-pie/Example';
import PiesSource from '!!raw-loader!../sandboxes/vx-shape-pie/Example';

export default () => {
  return (
    <Show component={Pies} title="Pies" codeSandboxDirectoryName="vx-shape-pie">
      {PiesSource}
    </Show>
  );
};
