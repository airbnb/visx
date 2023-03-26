import React from 'react';
import DelaunayChart from '../sandboxes/visx-delaunay/Example';
import packageJson from '../sandboxes/visx-delaunay/package.json';
import Show from '../components/Show';
import DelaunayChartSource from '!!raw-loader!../sandboxes/visx-delaunay/Example';

function DelaunayPage() {
  return (
    <Show
      events
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      component={DelaunayChart}
      title="Delaunay"
      codeSandboxDirectoryName="visx-delaunay"
      packageJson={packageJson}
    >
      {DelaunayChartSource}
    </Show>
  );
}
export default DelaunayPage;
