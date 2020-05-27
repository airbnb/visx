import React from 'react';
import Show from '../components/Show';
import StackedAreas from '../sandboxes/vx-stacked-areas/Example';
import StackedAreasSource from '!!raw-loader!../sandboxes/vx-stacked-areas/Example';
import packageJson from '../sandboxes/vx-stacked-areas/package.json';

export default () => (
  <Show
    component={StackedAreas}
    title="Stacked Areas"
    codeSandboxDirectoryName="vx-stacked-areas"
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
