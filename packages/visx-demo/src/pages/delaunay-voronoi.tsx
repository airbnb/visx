import React from 'react';
import VoronoiChart from '../sandboxes/visx-delaunay-voronoi/Example';
import packageJson from '../sandboxes/visx-delaunay-voronoi/package.json';
import Show from '../components/Show';
import VoronoiChartSource from '!!raw-loader!../sandboxes/visx-delaunay-voronoi/Example';

function DelaunayVoronoiPage() {
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
      title="Voronoi"
      codeSandboxDirectoryName="visx-delaunay-voronoi"
      packageJson={packageJson}
    >
      {VoronoiChartSource}
    </Show>
  );
}
export default DelaunayVoronoiPage;
