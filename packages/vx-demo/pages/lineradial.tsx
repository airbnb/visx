import React from 'react';
import Show from '../components/Show';
import LineRadial from '../sandboxes/vx-shape-line-radial/Example';
import LineRadialSource from '!!raw-loader!../sandboxes/vx-shape-line-radial/Example';
import packageJson from '../sandboxes/vx-shape-line-radial/package.json';

export default () => {
  return (
    <Show
      component={LineRadial}
      title="Line Radial"
      codeSandboxDirectoryName="vx-shape-line-radial"
      packageJson={packageJson}
    >
      {LineRadialSource}
    </Show>
  );
};
