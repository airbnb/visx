import React from 'react';
import Show from '../components/Show';
import Pies from '../sandboxes/visx-shape-pie/Example';
import PiesSource from '!!raw-loader!../sandboxes/visx-shape-pie/Example';
import packageJson from '../sandboxes/visx-shape-pie/package.json';

const PiesPage = () => (
  <Show
    component={Pies}
    title="Pies"
    codeSandboxDirectoryName="visx-shape-pie"
    packageJson={packageJson}
  >
    {PiesSource}
  </Show>
);
export default PiesPage;
