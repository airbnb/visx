import React from 'react';
import Show from '../components/Show';
import StatsPlot from '../sandboxes/vx-stats/Example';
import StatsPlotSource from '!!raw-loader!../sandboxes/vx-stats/Example';
import packageJson from '../sandboxes/vx-stats/package.json';

export default () => (
  <Show
    events
    component={StatsPlot}
    title="BoxPlot + ViolinPlot"
    codeSandboxDirectoryName="vx-stats"
    packageJson={packageJson}
  >
    {StatsPlotSource}
  </Show>
);
