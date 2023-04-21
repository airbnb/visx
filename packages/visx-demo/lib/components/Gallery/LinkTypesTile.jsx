import React from 'react';
import LinkTypes from '../../sandboxes/visx-linktypes/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-linktypes/package.json';
var tileStyles = { background: '#272b4d' };
var detailsStyles = { color: '#269688' };
export default function LinkTypesTile() {
    return (<GalleryTile title="Link Types" description="<Shape.Link* />" exampleRenderer={LinkTypes} exampleUrl="/linktypes" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
