import React from 'react';
import GeoAlbersUsa from '../sandboxes/visx-geo-albers-usa/Example';
import packageJson from '../sandboxes/visx-geo-albers-usa/package.json';
import Show from '../components/Show';
import GeoAlbersUsaSource from '!!raw-loader!../sandboxes/visx-geo-albers-usa/Example';

function GeoAlbersUsaPage() {
  return (
    <Show
      events
      component={GeoAlbersUsa}
      title="Geo AlbersUsa"
      codeSandboxDirectoryName="visx-geo-albers-usa"
      packageJson={packageJson}
    >
      {GeoAlbersUsaSource}
    </Show>
  );
}
export default GeoAlbersUsaPage;
