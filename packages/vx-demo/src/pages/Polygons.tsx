import React from 'react';
import Show from '../components/Show';
import Polygons from '../docs-v2/examples/vx-polygons/Example';
import PolygonsSource from '!!raw-loader!../docs-v2/examples/vx-polygons/Example';

export default () => (
  <Show component={Polygons} title="Polygons" codeSandboxDirectoryName="vx-polygons">
    {PolygonsSource}
  </Show>
);
