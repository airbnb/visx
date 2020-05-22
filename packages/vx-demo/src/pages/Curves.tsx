import React from 'react';
import Show from '../components/Show';
import Lines from '../sandboxes/vx-curve/Example';
import LinesSource from '!!raw-loader!../sandboxes/vx-curve/Example';

export default () => {
  return (
    <Show component={Lines} title="Curves" codeSandboxDirectoryName="vx-curve">
      {LinesSource}
    </Show>
  );
};
