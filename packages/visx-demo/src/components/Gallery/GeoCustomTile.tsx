import React from 'react';
import GeoCustom, { GeoCustomProps, background } from '../../sandboxes/visx-geo-custom/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-geo-custom/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#019ece' };
const exampleProps = { events: false };

export default function GeoCustomTile() {
  return (
    <GalleryTile<GeoCustomProps>
      title="Custom Geos"
      description="<Geo.CustomProjection />"
      exampleProps={exampleProps}
      exampleRenderer={GeoCustom}
      exampleUrl="/geo-custom"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
