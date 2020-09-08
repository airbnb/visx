import React from 'react';
import Show from '../components/Show';
import Polygons from '../sandboxes/visx-polygons/Example';
import PolygonsSource from '!!raw-loader!../sandboxes/visx-polygons/Example';
import packageJson from '../sandboxes/visx-polygons/package.json';

export default () => (
  <Show
    component={Polygons}
    title="Polygons"
    codeSandboxDirectoryName="visx-polygons"
    packageJson={packageJson}
  >
    {PolygonsSource}
  </Show>
);
