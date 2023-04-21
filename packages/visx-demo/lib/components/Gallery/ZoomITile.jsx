import React from 'react';
import ZoomI from '../../sandboxes/visx-zoom-i/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-zoom-i/package.json';
var tileStyles = { background: '#0a0a0a' };
var detailsStyles = { color: '#ccc' };
export default function ZoomITile() {
    return (<GalleryTile title="Zoom" description="<Zoom />" exampleRenderer={ZoomI} exampleUrl="/zoom-i" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
