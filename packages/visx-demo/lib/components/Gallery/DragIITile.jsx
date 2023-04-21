import React from 'react';
import DragII from '../../sandboxes/visx-drag-ii/Example';
import GalleryTile from '../GalleryTile';
import drawData from '../util/drawData';
export { default as packageJson } from '../../sandboxes/visx-drag-ii/package.json';
var tileStyles = { background: '#04002b', borderRadius: 14 };
var detailsStyles = { color: '#ff614e', zIndex: 1 };
var exampleProps = { data: drawData };
export default function DragIITile() {
    return (<GalleryTile title="Drag ii" description="<Drag.Drag />" exampleProps={exampleProps} exampleRenderer={DragII} exampleUrl="/drag-ii" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
