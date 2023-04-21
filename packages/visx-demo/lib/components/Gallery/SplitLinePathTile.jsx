import React from 'react';
import SplitLinePathExample, { backgroundLight, } from '../../sandboxes/visx-shape-splitlinepath/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-shape-splitlinepath/package.json';
var tileStyles = { background: backgroundLight };
var detailsStyles = { color: 'white' };
export default function SplitLinePathTile() {
    return (<GalleryTile title="SplitLinePath" description="<Shape.SplitLinePath />" exampleRenderer={SplitLinePathExample} exampleUrl="/splitlinepath" tileStyles={tileStyles} detailsStyles={detailsStyles} detailsHeight={0}/>);
}
