import React from 'react';
import Show from '../components/Show';
import XYChart from '../sandboxes/vx-xychart/Example';
import XYChartSource from '!!raw-loader!../sandboxes/vx-xychart/Example';
import packageJson from '../sandboxes/vx-xychart/package.json';

export default () => (
  <Show
    component={XYChart}
    title="XYChart"
    codeSandboxDirectoryName="vx-xychart"
    packageJson={packageJson}
  >
    {XYChartSource}
  </Show>
);
