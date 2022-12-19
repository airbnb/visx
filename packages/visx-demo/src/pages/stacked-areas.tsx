import React from 'react';
import StackedAreas from '@visx/demo-stacked-areas/Example';
import packageJson from '@visx/demo-stacked-areas/package.json';
import Show from '../components/Show';
import StackedAreasSource from '!!raw-loader!../sandboxes/visx-stacked-areas/Example';

function StackedAreasPage() {
  return (
    <Show
      component={StackedAreas}
      title="Stacked Areas"
      codeSandboxDirectoryName="visx-stacked-areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      }}
      packageJson={packageJson}
    >
      {StackedAreasSource}
    </Show>
  );
}
export default StackedAreasPage;
