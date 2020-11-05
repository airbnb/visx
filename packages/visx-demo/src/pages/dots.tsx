import React from 'react';
import Show from '../components/Show';
import Dots from '../sandboxes/visx-dots/Example';
import DotsSource from '!!raw-loader!../sandboxes/visx-dots/Example';
import packageJson from '../sandboxes/visx-dots/package.json';

const DotsPage = () => (
  <Show
    component={Dots}
    title="Dots"
    codeSandboxDirectoryName="visx-dots"
    packageJson={packageJson}
  >
    {DotsSource}
  </Show>
);
export default DotsPage;
