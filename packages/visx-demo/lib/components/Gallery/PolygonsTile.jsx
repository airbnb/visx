import React from 'react';
import Polygon, { background } from '../../sandboxes/visx-polygons/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-polygons/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: 'white' };
var exampleProps = { margin: { top: 10, right: 0, bottom: 76, left: 0 } };
export default function PolygonsTile() {
    return (<GalleryTile title="Polygons" description="<Shape.Polygon />" exampleProps={exampleProps} exampleRenderer={Polygon} exampleUrl="/polygons" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
