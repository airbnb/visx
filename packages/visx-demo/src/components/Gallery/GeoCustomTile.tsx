import React from 'react';
import GeoCustom, { GeoCustomProps, background } from '@visx/demo-geo-custom/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-geo-custom/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#019ece' };
const exampleProps = { events: false };

export default function GeoCustomTile() {
  return (
    <GalleryTile<GeoCustomProps>
      title="Custom Projection"
      description="<Geo.CustomProjection />"
      exampleProps={exampleProps}
      exampleRenderer={GeoCustom}
      exampleUrl="/geo-custom"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
