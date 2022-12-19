import React from 'react';
import Responsive from '../sandboxes/visx-responsive/Example';
import packageJson from '../sandboxes/visx-responsive/package.json';
import Show from '../components/Show';
import ResponsiveSource from '!!raw-loader!../sandboxes/visx-responsive/Example';

function ResponsivePage() {
  return (
    <Show
      component={Responsive}
      title="Responsive"
      codeSandboxDirectoryName="visx-responsive"
      packageJson={packageJson}
    >
      {ResponsiveSource}
    </Show>
  );
}
export default ResponsivePage;
