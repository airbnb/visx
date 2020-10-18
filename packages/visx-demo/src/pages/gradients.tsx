import React from 'react';
import Show from '../components/Show';
import Gradients from '../sandboxes/visx-gradient/Example';
import GradientsSource from '!!raw-loader!../sandboxes/visx-gradient/Example';
import packageJson from '../sandboxes/visx-gradient/package.json';

const GradientsPage = () => (
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
export default GradientsPage;
