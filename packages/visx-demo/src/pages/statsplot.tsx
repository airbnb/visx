import React from 'react';
import Show from '../components/Show';
import StatsPlot from '../sandboxes/visx-stats/Example';
import StatsPlotSource from '!!raw-loader!../sandboxes/visx-stats/Example';
import packageJson from '../sandboxes/visx-stats/package.json';

const StatsPlotPage = () => (
  <Show
    events
    component={StatsPlot}
    title="BoxPlot + ViolinPlot"
    codeSandboxDirectoryName="visx-stats"
    packageJson={packageJson}
  >
    {StatsPlotSource}
  </Show>
);
export default StatsPlotPage;
