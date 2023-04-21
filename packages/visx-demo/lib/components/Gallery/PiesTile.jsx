import React from 'react';
import Pie from '../../sandboxes/visx-shape-pie/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-shape-pie/package.json';
var tileStyles = { background: '#7f82e3' };
var detailsStyles = { color: 'rgb(93,30,91)' };
var exampleProps = { animate: false, margin: { top: 20, right: 20, bottom: 80, left: 20 } };
export default function PiesTile() {
    return (<GalleryTile title="Pies & donuts" description="<Shape.Pie />" exampleProps={exampleProps} exampleRenderer={Pie} exampleUrl="/pies" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
