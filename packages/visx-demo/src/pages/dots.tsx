import React from 'react';
import Dots from '../sandboxes/visx-dots/Example';
import packageJson from '../sandboxes/visx-dots/package.json';
import Show from '../components/Show';
import DotsSource from '!!raw-loader!../sandboxes/visx-dots/Example';

function DotsPage() {
  return (
    <Show
      component={Dots}
      title="Dots"
      codeSandboxDirectoryName="visx-dots"
      packageJson={packageJson}
    >
      {DotsSource}
    </Show>
  );
}
export default DotsPage;
