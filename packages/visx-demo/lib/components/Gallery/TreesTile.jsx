import React from 'react';
import Tree, { background } from '../../sandboxes/visx-tree/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-tree/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: '#269688' };
var exampleProps = { margin: { top: 10, left: 30, right: 40, bottom: 76 } };
export default function TreesTile() {
    return (<GalleryTile title="Trees" description="<Hierarchy.Tree /> + <Shape.LinkHorizontal />" exampleProps={exampleProps} exampleRenderer={Tree} exampleUrl="/trees" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
