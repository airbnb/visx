import React from 'react';
import Show from '../components/Show';
import Responsive from '../sandboxes/visx-responsive/Example';
import ResponsiveSource from '!!raw-loader!../sandboxes/visx-responsive/Example';
import packageJson from '../sandboxes/visx-responsive/package.json';

const ResponsivePage = () => (
  <Show
    component={Responsive}
    title="Responsive"
    codeSandboxDirectoryName="visx-responsive"
    packageJson={packageJson}
  >
    {ResponsiveSource}
  </Show>
);
export default ResponsivePage;
