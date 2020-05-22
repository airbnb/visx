import React from 'react';
import Show from '../components/Show';
import Polygons from '../sandboxes/vx-polygons/Example';
import PolygonsSource from '!!raw-loader!../sandboxes/vx-polygons/Example';

export default () => (
  <Show component={Polygons} title="Polygons" codeSandboxDirectoryName="vx-polygons">
    {PolygonsSource}
  </Show>
);
