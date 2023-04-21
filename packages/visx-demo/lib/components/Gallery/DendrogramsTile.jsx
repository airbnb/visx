import React from 'react';
import Dendrogram, { background, green, } from '../../sandboxes/visx-dendrogram/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-dendrogram/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: green };
var exampleProps = { margin: { top: 40, left: 0, right: 0, bottom: 90 } };
export default function DendrogramsTile() {
    return (<GalleryTile title="Dendrograms" description="<Hierarchy.Cluster /> + <Shape.LinkVertical />" exampleProps={exampleProps} exampleRenderer={Dendrogram} exampleUrl="/dendrograms" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
