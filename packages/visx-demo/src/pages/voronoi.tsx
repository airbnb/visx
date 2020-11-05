import React from 'react';
import Show from '../components/Show';
import VoronoiChart from '../sandboxes/visx-voronoi/Example';
import VoronoiChartSource from '!!raw-loader!../sandboxes/visx-voronoi/Example';
import packageJson from '../sandboxes/visx-voronoi/package.json';

const VoronoiPage = () => (
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
    codeSandboxDirectoryName="visx-voronoi"
    packageJson={packageJson}
  >
    {VoronoiChartSource}
  </Show>
);
export default VoronoiPage;
