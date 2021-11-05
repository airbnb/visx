import React from 'react';
import Show from '../components/Show';
import GeoAlbersUsa from '../sandboxes/visx-geo-albers-usa/Example';
import GeoAlbersUsaSource from '!!raw-loader!../sandboxes/visx-geo-albers-usa/Example';
import packageJson from '../sandboxes/visx-geo-albers-usa/package.json';

const GeoAlbersUsaPage = () => {
  return (
    <Show
      events
      /* @ts-ignore */
      component={GeoAlbersUsa}
      title="Geo AlbersUsa"
      codeSandboxDirectoryName="visx-geo-albers-usa"
      packageJson={packageJson}
    >
      {GeoAlbersUsaSource}
    </Show>
  );
};
export default GeoAlbersUsaPage;
