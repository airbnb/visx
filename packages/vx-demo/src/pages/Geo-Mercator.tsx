import React from 'react';
import Show from '../components/Show';
import GeoMercator from '../sandboxes/vx-geo-mercator/Example';
import GeoMercatorSource from '!!raw-loader!../sandboxes/vx-geo-mercator/Example';

export default () => {
  return (
    <Show
      events
      component={GeoMercator}
      title="Geo Mercator"
      codeSandboxDirectoryName="vx-geo-mercator"
    >
      {GeoMercatorSource}
    </Show>
  );
};
