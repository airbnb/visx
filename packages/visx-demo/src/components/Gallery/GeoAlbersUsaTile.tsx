import React from 'react';
import type { GeoAlbersUsaProps } from '../../sandboxes/visx-geo-albers-usa/Example';
import GeoAlbersUsa, { background, colors } from '../../sandboxes/visx-geo-albers-usa/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-geo-albers-usa/package.json';

const tileStyles = { background };
const detailsStyles = { color: colors[1] };

export default function GeoAlbersUsaTile() {
  return (
    <GalleryTile<GeoAlbersUsaProps>
      title="AlbersUsa"
      description="<Geo.AlbersUsa />"
      exampleProps={{ fullSize: false }}
      exampleRenderer={GeoAlbersUsa}
      exampleUrl="/geo-albers-usa"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
