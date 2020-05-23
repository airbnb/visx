import React from 'react';
import Show from '../components/Show';
import StatsPlot from '../sandboxes/vx-stats/Example';
import StatsPlotSource from '!!raw-loader!../sandboxes/vx-stats/Example';

export default () => (
  <Show
    events
    component={StatsPlot}
    title="BoxPlot + ViolinPlot"
    codeSandboxDirectoryName="vx-stats"
  >
    {StatsPlotSource}
  </Show>
);
