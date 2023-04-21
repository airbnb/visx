import React from 'react';
import DragI from '../../sandboxes/visx-drag-i/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-drag-i/package.json';
var tileStyles = { background: '#c4c3cb', borderRadius: 14 };
var detailsStyles = { color: '#6437d6', zIndex: 1 };
export default function DragITile() {
    return (<GalleryTile title="Drag i" description="<Drag.Drag />>" exampleRenderer={DragI} exampleUrl="/drag-i" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
