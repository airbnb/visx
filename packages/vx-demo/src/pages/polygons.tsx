import React from 'react';
import Show from '../components/Show';
import Polygons from '../sandboxes/vx-polygons/Example';
import PolygonsSource from '!!raw-loader!../sandboxes/vx-polygons/Example';
import packageJson from '../sandboxes/vx-polygons/package.json';

export default () => (
  <Show
    component={Polygons}
    title="Polygons"
    codeSandboxDirectoryName="vx-polygons"
    packageJson={packageJson}
  >
    {PolygonsSource}
  </Show>
);
