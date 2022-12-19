import React from 'react';
import GeoCustom from '../sandboxes/visx-geo-custom/Example';
import packageJson from '../sandboxes/visx-geo-custom/package.json';
import Show from '../components/Show';
import GeoCustomSource from '!!raw-loader!../sandboxes/visx-geo-custom/Example';

function GeoCustomPage() {
  return (
    <Show
      events
      component={GeoCustom}
      title="Geo Custom"
      codeSandboxDirectoryName="visx-geo-custom"
      packageJson={packageJson}
    >
      {GeoCustomSource}
    </Show>
  );
}
export default GeoCustomPage;
