import React from 'react';
import Brush, { background, accentColor } from '../../sandboxes/visx-brush/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-brush/package.json';
var tileStyles = { border: "1px solid " + accentColor };
var detailsStyles = { color: background };
var exampleProps = { compact: true, margin: { top: 10, left: 50, bottom: 60, right: 20 } };
export default function BrushTile() {
    return (<GalleryTile title="Brush" description="<Brush />" exampleProps={exampleProps} exampleRenderer={Brush} exampleUrl="/brush" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
