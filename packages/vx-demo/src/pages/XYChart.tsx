import React from 'react';
import Show from '../components/Show';
import XYChart from '../sandboxes/vx-chart-poc/Example';
import XYChartSource from '!!raw-loader!../sandboxes/vx-chart-poc/Example';

export default () => (
  <Show
    component={XYChart}
    title="XYChart Proof-of-Concept"
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
  >
    {XYChartSource}
  </Show>
);
