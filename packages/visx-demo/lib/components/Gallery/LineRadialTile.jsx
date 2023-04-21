import React from 'react';
import LineRadial, { background, blue, } from '../../sandboxes/visx-shape-line-radial/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-shape-line-radial/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: blue };
var exampleProps = { animate: false };
export default function LineRadialTile() {
    return (<GalleryTile title="Radial Lines" description="<Shape.LineRadial />" exampleProps={exampleProps} exampleRenderer={LineRadial} exampleUrl="/lineradial" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
