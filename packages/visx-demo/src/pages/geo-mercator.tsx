import React from 'react';
import GeoMercator from '../sandboxes/visx-geo-mercator/Example';
import packageJson from '../sandboxes/visx-geo-mercator/package.json';
import Show from '../components/Show';
import GeoMercatorSource from '!!raw-loader!../sandboxes/visx-geo-mercator/Example';

function GeoMercatorPage() {
  return (
    <Show
      events
      component={GeoMercator}
      title="Geo Mercator"
      codeSandboxDirectoryName="visx-geo-mercator"
      packageJson={packageJson}
    >
      {GeoMercatorSource}
    </Show>
  );
}
export default GeoMercatorPage;
