import React from 'react';
import Show from '../components/Show';
import StatsPlot from '../components/tiles/Statsplot';
import StatsPlotSource from '!!raw-loader!../components/tiles/Statsplot';

export default () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
    component={StatsPlot}
    title="BoxPlot With ViolinPlot"
  >
    {StatsPlotSource}
  </Show>
);
