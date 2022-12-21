import React from 'react';
import Pies from '../sandboxes/visx-shape-pie/Example';
import packageJson from '../sandboxes/visx-shape-pie/package.json';
import Show from '../components/Show';
import PiesSource from '!!raw-loader!../sandboxes/visx-shape-pie/Example';

function PiesPage() {
  return (
    <Show
      component={Pies}
      title="Pies"
      codeSandboxDirectoryName="visx-shape-pie"
      packageJson={packageJson}
    >
      {PiesSource}
    </Show>
  );
}
export default PiesPage;
