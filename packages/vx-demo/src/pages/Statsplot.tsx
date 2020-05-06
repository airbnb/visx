import React from 'react';
import Show from '../components/Show';
import StatsPlot from '../docs-v2/examples/vx-stats/Example';
import StatsPlotSource from '!!raw-loader!../docs-v2/examples/vx-stats/Example';

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
