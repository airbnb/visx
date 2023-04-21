import React from 'react';
import Area, { accentColor, background } from '../../sandboxes/visx-area/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-area/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: accentColor };
export default function AreaTile() {
    return (<GalleryTile title="AreaClosed" description="<Shape.AreaClosed />" exampleRenderer={Area} exampleUrl="/areas" detailsStyles={detailsStyles} tileStyles={tileStyles}/>);
}
