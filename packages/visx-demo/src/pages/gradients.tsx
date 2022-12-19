import React from 'react';
import Gradients from '@visx/demo-gradient/Example';
import packageJson from '@visx/demo-gradient/package.json';
import Show from '../components/Show';
import GradientsSource from '!!raw-loader!../sandboxes/visx-gradient/Example';

function GradientsPage() {
  return (
    <Show
      shadow
      component={Gradients}
      title="Gradients"
      codeSandboxDirectoryName="visx-gradient"
      packageJson={packageJson}
    >
      {GradientsSource}
    </Show>
  );
}
export default GradientsPage;
