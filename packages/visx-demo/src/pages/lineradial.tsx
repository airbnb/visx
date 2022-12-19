import React from 'react';
import LineRadial from '../sandboxes/visx-shape-line-radial/Example';
import packageJson from '../sandboxes/visx-shape-line-radial/package.json';
import Show from '../components/Show';
import LineRadialSource from '!!raw-loader!../sandboxes/visx-shape-line-radial/Example';

function LineRadialPage() {
  return (
    <Show
      component={LineRadial}
      title="Line Radial"
      codeSandboxDirectoryName="visx-shape-line-radial"
      packageJson={packageJson}
    >
      {LineRadialSource}
    </Show>
  );
}
export default LineRadialPage;
