import React from 'react';
import Show from '../components/Show';
import Lines from '../sandboxes/vx-curve/Example';
import LinesSource from '!!raw-loader!../sandboxes/vx-curve/Example';
import packageJson from '../sandboxes/vx-curve/package.json';

export default () => {
  return (
    <Show
      component={Lines}
      title="Curves"
      codeSandboxDirectoryName="vx-curve"
      packageJson={packageJson}
    >
      {LinesSource}
    </Show>
  );
};
