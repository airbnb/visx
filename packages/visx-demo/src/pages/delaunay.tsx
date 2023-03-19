import React from 'react';
import VoronoiChart from '../sandboxes/visx-voronoi/Example';
import packageJson from '../sandboxes/visx-voronoi/package.json';
import Show from '../components/Show';
import VoronoiChartSource from '!!raw-loader!../sandboxes/visx-voronoi/Example';

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
      component={VoronoiChart}
      title="Delaunay"
      codeSandboxDirectoryName="visx-delaunay"
      packageJson={packageJson}
    >
      {VoronoiChartSource}
    </Show>
  );
}
export default DelaunayPage;
