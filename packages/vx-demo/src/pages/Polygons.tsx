import React from 'react';
import Show from '../components/Show';
import Polygons from '../components/tiles/Polygons';
import PolygonsSource from '!!raw-loader!../components/tiles/Polygons';

export default () => (
  <Show component={Polygons} title="Polygons">
    {PolygonsSource}
  </Show>
);
