import React from 'react';
import Lines from '../sandboxes/visx-curve/Example';
import packageJson from '../sandboxes/visx-curve/package.json';
import Show from '../components/Show';
import LinesSource from '!!raw-loader!../sandboxes/visx-curve/Example';

function CurvesPage() {
  return (
    <Show
      component={Lines}
      title="Curves"
      codeSandboxDirectoryName="visx-curve"
      packageJson={packageJson}
    >
      {LinesSource}
    </Show>
  );
}
export default CurvesPage;
