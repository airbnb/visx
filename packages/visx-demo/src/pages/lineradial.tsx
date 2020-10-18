import React from 'react';
import Show from '../components/Show';
import LineRadial from '../sandboxes/visx-shape-line-radial/Example';
import LineRadialSource from '!!raw-loader!../sandboxes/visx-shape-line-radial/Example';
import packageJson from '../sandboxes/visx-shape-line-radial/package.json';

const LineRadialPage = () => {
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
};
export default LineRadialPage;
