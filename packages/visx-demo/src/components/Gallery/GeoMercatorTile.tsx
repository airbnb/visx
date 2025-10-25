import React from 'react';
import type { GeoMercatorProps } from '../../sandboxes/visx-geo-mercator/Example';
import GeoMercator, { background } from '../../sandboxes/visx-geo-mercator/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-geo-mercator/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#f63a48' };

export default function GeoMercatorTile() {
  return (
    <GalleryTile<GeoMercatorProps>
      title="Mercator"
      description="<Geo.Mercator />"
      exampleRenderer={GeoMercator}
      exampleUrl="/geo-mercator"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
