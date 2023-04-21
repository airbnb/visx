import React from 'react';
import Legends from '../../sandboxes/visx-legend/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-legend/package.json';
var tileStyles = { background: 'black' };
var detailsStyles = { color: '#aaa' };
export default function LegendsTile() {
    return (<GalleryTile title="Legends" description="<Legend />" exampleRenderer={Legends} exampleUrl="/legends" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
