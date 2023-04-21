import React from 'react';
import Curve from '../../sandboxes/visx-curve/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-curve/package.json';
var tileStyles = { border: '1px solid lightgray' };
var detailsStyles = { color: '#222' };
var exampleProps = { showControls: false };
export default function CurvesTile() {
    return (<GalleryTile title="Curves" description="<Curve.* /> <Shape.Line />" exampleProps={exampleProps} exampleRenderer={Curve} exampleUrl="/curves" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
