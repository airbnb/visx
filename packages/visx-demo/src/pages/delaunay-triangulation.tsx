import React from 'react';
import DelaunayTriangulation from '../sandboxes/visx-delaunay-triangulation/Example';
import packageJson from '../sandboxes/visx-delaunay-triangulation/package.json';
import Show from '../components/Show';
import DelaunayTriangulationSource from '!!raw-loader!../sandboxes/visx-delaunay-triangulation/Example';

function DelaunayTriangulationPage() {
  return (
    <Show
      events
      margin={{
        top: 16,
        left: 16,
        right: 16,
        bottom: 16,
      }}
      component={DelaunayTriangulation}
      title="Delaunay Triangulation"
      codeSandboxDirectoryName="visx-delaunay-triangulation"
      packageJson={packageJson}
    >
      {DelaunayTriangulationSource}
    </Show>
  );
}
export default DelaunayTriangulationPage;
