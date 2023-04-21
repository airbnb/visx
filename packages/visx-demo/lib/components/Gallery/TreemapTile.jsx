import React from 'react';
import Treemap, { background, color1 } from '../../sandboxes/visx-treemap/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-treemap/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: color1 };
var exampleProps = { margin: { top: 0, left: 10, right: 10, bottom: 76 } };
export default function TreemapTile() {
    return (<GalleryTile title="Treemap" description="<Hierarchy.Treemap />" exampleProps={exampleProps} exampleRenderer={Treemap} exampleUrl="/treemap" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
