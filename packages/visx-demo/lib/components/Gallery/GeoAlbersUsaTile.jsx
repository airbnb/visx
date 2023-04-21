import React from 'react';
import GeoAlbersUsa, { background, colors, } from '../../sandboxes/visx-geo-albers-usa/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-geo-albers-usa/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: colors[1] };
export default function GeoAlbersUsaTile() {
    return (<GalleryTile title="AlbersUsa" description="<Geo.AlbersUsa />" exampleProps={{ fullSize: false }} exampleRenderer={GeoAlbersUsa} exampleUrl="/geo-albers-usa" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
