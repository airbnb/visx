import React from 'react';
import GeoMercator, { background, } from '../../sandboxes/visx-geo-mercator/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-geo-mercator/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: '#f63a48' };
export default function GeoMercatorTile() {
    return (<GalleryTile title="Mercator" description="<Geo.Mercator />" exampleRenderer={GeoMercator} exampleUrl="/geo-mercator" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
