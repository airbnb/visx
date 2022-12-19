import React from 'react';
import StatsPlot from '@visx/demo-stats/Example';
import packageJson from '@visx/demo-stats/package.json';
import Show from '../components/Show';
import StatsPlotSource from '!!raw-loader!../sandboxes/visx-stats/Example';

function StatsPlotPage() {
  return (
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
}
export default StatsPlotPage;
