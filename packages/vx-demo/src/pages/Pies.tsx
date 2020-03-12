import React from 'react';
import Show from '../components/Show';
import Pies from '../docs-v2/examples/vx-shape-pie/Example';
import PiesSource from '!!raw-loader!../docs-v2/examples/vx-shape-pie/Example';

export default () => {
  return (
    <Show component={Pies} title="Pies" codeSandboxDirectoryName="vx-shape-pie">
      {PiesSource}
    </Show>
  );
};
