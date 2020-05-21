import React from 'react';
import Show from '../components/Show';
import Heatmaps from '../docs-v2/examples/vx-heatmap/Example';
import HeatmapsSource from '!!raw-loader!../docs-v2/examples/vx-heatmap/Example';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80,
      }}
      component={Heatmaps}
      title="Heatmaps"
      codeSandboxDirectoryName="vx-heatmap"
    >
      {HeatmapsSource}
    </Show>
  );
};
