import React from 'react';
import Show from '../components/Show';
import Lines from '../docs-v2/examples/vx-curve/Example';
import LinesSource from '!!raw-loader!../docs-v2/examples/vx-curve/Example';

export default () => {
  return (
    <Show component={Lines} title="Curves" codeSandboxDirectoryName="vx-curve">
      {LinesSource}
    </Show>
  );
};
