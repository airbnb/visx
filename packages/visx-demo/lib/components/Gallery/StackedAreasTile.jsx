import React from 'react';
import StackedAreas, { background, } from '../../sandboxes/visx-stacked-areas/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-stacked-areas/package.json';
var tileStyles = { background: background };
var detailsStyles = { color: 'rgba(251, 224, 137, 1.000)' };
export default function StackedAreasTile() {
    return (<GalleryTile title="Stacked Areas" description="<Shape.AreaStack />" detailsStyles={detailsStyles} exampleRenderer={StackedAreas} exampleUrl="/stacked-areas" tileStyles={tileStyles}/>);
}
