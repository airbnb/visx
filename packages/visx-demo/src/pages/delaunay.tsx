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
        top: 16,
        left: 16,
        right: 16,
        bottom: 16,
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
