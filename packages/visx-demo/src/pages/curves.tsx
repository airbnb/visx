import React from 'react';
import Show from '../components/Show';
import Lines from '../sandboxes/visx-curve/Example';
import LinesSource from '!!raw-loader!../sandboxes/visx-curve/Example';
import packageJson from '../sandboxes/visx-curve/package.json';

const CurvesPage = () => {
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
};
export default CurvesPage;
