import React from 'react';
import Bars from '../../sandboxes/visx-bars/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-bars/package.json';
var tileStyles = { background: '#5290e7' };
var detailsStyles = { color: 'rgba(25, 231, 217, 1)' };
export default function BarsTile() {
    return (<GalleryTile title="Bars" description="<Shape.Bar />" exampleRenderer={Bars} exampleUrl="/bars" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
