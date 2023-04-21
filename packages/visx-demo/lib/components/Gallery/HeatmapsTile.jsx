import React from 'react';
import Heatmap, { background } from '../../sandboxes/visx-heatmap/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-heatmap/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: 'rgba(255,255,255,0.3)' };
export default function HeatmapsTile() {
    return (<GalleryTile title="Heatmaps" description="<HeatmapCircle /> & <HeatmapRect />" exampleRenderer={Heatmap} exampleUrl="/heatmaps" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
