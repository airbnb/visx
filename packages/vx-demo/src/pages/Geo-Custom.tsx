import React from 'react';
import Show from '../components/Show';
import GeoCustom from '../components/tiles/Geo-Custom';
import GeoCustomSource from '!!raw-loader!../components/tiles/Geo-Custom';

export default () => {
  return (
    <Show events component={GeoCustom} title="Geo Custom">
      {GeoCustomSource}
    </Show>
  );
};
