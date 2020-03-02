import React from 'react';
import Show from '../components/Show';
import GeoMercator from '../components/tiles/Geo-Mercator';
import GeoMercatorSource from '!!raw-loader!../components/tiles/Geo-Mercator';

export default () => {
  return (
    <Show events component={GeoMercator} title="Geo Mercator">
      {GeoMercatorSource}
    </Show>
  );
};
