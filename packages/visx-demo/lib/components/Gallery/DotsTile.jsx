import React from 'react';
import Dots from '../../sandboxes/visx-dots/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-dots/package.json';
var tileStyles = { background: '#fd6e7f' };
var detailsStyles = { color: '#f6c431' };
var exampleProps = { showControls: false };
export default function DotsTile() {
    return (<GalleryTile title="Dots" description="<Shape.Circle />" exampleProps={exampleProps} exampleRenderer={Dots} exampleUrl="/dots" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
