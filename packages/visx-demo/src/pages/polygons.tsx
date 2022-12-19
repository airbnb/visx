import React from 'react';
import Polygons from '@visx/demo-polygons/Example';
import packageJson from '@visx/demo-polygons/package.json';
import Show from '../components/Show';
import PolygonsSource from '!!raw-loader!../sandboxes/visx-polygons/Example';

function PolygonsPage() {
  return (
    <Show
      component={Polygons}
      title="Polygons"
      codeSandboxDirectoryName="visx-polygons"
      packageJson={packageJson}
    >
      {PolygonsSource}
    </Show>
  );
}
export default PolygonsPage;
