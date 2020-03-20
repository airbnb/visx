import React from 'react';
import Show from '../components/Show';
import GeoMercator from '../docs-v2/examples/vx-geo-mercator/Example';
import GeoMercatorSource from '!!raw-loader!../docs-v2/examples/vx-geo-mercator/Example';

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
