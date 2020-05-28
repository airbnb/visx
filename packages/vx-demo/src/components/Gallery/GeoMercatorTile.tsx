import React from 'react';
import GeoMercator, { GeoMercatorProps, background } from '../../sandboxes/vx-geo-mercator/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { background };
const detailsStyles = { color: '#f63a48' };

export default function GeoMercatorTile() {
  return (
    <GalleryTile<GeoMercatorProps>
      title="Preset Geos"
      description="<Geo.Mercator />"
      exampleRenderer={GeoMercator}
      exampleUrl="/geo-mercator"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
