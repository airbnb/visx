import React from 'react';
import Show from '../components/Show';
import XYChart from '../sandboxes/visx-xychart/Example';
import XYChartSource from '!!raw-loader!../sandboxes/visx-xychart/Example';
import packageJson from '../sandboxes/visx-xychart/package.json';

const XYChartPage = () => (
  <Show
    component={XYChart}
    title="XYChart"
    codeSandboxDirectoryName="visx-xychart"
    packageJson={packageJson}
  >
    {XYChartSource}
  </Show>
);
export default XYChartPage;
