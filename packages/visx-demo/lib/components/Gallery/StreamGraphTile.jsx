import React from 'react';
import StreamGraph, { BACKGROUND as background, } from '../../sandboxes/visx-streamgraph/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-streamgraph/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: 'rgb(93,30,91)' };
var exampleProps = { animate: false };
export default function StreamGraphTile() {
    return (<GalleryTile title="Streamgraph" description="<Shape.Stack />" exampleProps={exampleProps} exampleRenderer={StreamGraph} exampleUrl="/streamgraph" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
