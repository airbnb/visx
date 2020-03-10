import React from 'react';
import Show from '../components/Show';
import LineRadial from '../docs-v2/examples/vx-shape-line-radial/Example';
import LineRadialSource from '!!raw-loader!../docs-v2/examples/vx-shape-line-radial/Example';

export default () => {
  return (
    <Show
      component={LineRadial}
      title="Line Radial"
      codeSandboxDirectoryName="vx-shape-line-radial"
    >
      {LineRadialSource}
    </Show>
  );
};
