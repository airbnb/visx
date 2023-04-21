import React from 'react';
import BarGroup, { background, green } from '../../sandboxes/visx-bargroup/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-bargroup/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: green };
export default function BarGroupTile() {
    return (<GalleryTile title="Bar Group" description="<Shape.BarGroup />" detailsStyles={detailsStyles} exampleRenderer={BarGroup} exampleUrl="/bargroup" tileStyles={tileStyles}/>);
}
