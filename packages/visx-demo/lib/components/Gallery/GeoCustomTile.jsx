import React from 'react';
import GeoCustom, { background } from '../../sandboxes/visx-geo-custom/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-geo-custom/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: '#019ece' };
var exampleProps = { events: false };
export default function GeoCustomTile() {
    return (<GalleryTile title="Custom Projection" description="<Geo.CustomProjection />" exampleProps={exampleProps} exampleRenderer={GeoCustom} exampleUrl="/geo-custom" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
