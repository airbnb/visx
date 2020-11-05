import React from 'react';
import Show from '../components/Show';
import Heatmaps from '../sandboxes/visx-heatmap/Example';
import HeatmapsSource from '!!raw-loader!../sandboxes/visx-heatmap/Example';
import packageJson from '../sandboxes/visx-heatmap/package.json';

const HeatmapsPage = () => {
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
      codeSandboxDirectoryName="visx-heatmap"
      packageJson={packageJson}
    >
      {HeatmapsSource}
    </Show>
  );
};
export default HeatmapsPage;
