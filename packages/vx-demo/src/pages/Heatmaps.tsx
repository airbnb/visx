import React from 'react';
import Show from '../components/Show';
import Heatmaps from '../sandboxes/vx-heatmap/Example';
import HeatmapsSource from '!!raw-loader!../sandboxes/vx-heatmap/Example';
import packageJson from '../sandboxes/vx-heatmap/package.json';

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
      packageJson={packageJson}
    >
      {HeatmapsSource}
    </Show>
  );
};
