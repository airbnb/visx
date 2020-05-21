import React from 'react';
import Show from '../components/Show';
import StackedAreas from '../docs-v2/examples/vx-stacked-areas/Example';
import StackedAreasSource from '!!raw-loader!../docs-v2/examples/vx-stacked-areas/Example';

export default () => {
  return (
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
    >
      {StackedAreasSource}
    </Show>
  );
};
