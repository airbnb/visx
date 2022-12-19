import React from 'react';
import Responsive from '@visx/demo-responsive/Example';
import packageJson from '@visx/demo-responsive/package.json';
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
