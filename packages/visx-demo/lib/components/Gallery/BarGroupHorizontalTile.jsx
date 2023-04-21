import React from 'react';
import BarGroupHorizontal, { background, green, } from '../../sandboxes/visx-bargroup-horizontal/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-bargroup-horizontal/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: green };
var exampleProps = { margin: { top: 20, bottom: 70, left: 50, right: 20 } };
export default function BarGroupHorizontalTile() {
    return (<GalleryTile title="Bar Group Horizontal" description="<Shape.BarGroupHorizontal />" detailsStyles={detailsStyles} exampleProps={exampleProps} exampleRenderer={BarGroupHorizontal} exampleUrl="/bargrouphorizontal" tileStyles={tileStyles}/>);
}
