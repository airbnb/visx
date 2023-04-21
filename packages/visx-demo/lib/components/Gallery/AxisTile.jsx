import React from 'react';
import Axis, { backgroundColor, labelColor } from '../../sandboxes/visx-axis/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-axis/package.json';
var tileStyles = { backgroundColor: backgroundColor };
var detailsStyles = { color: labelColor };
var exampleProps = { showControls: false };
export default function AxisTile() {
    return (<GalleryTile title="Axes & scales" description="<Axis.AxisBottom />" detailsStyles={detailsStyles} detailsHeight={20} exampleProps={exampleProps} exampleRenderer={Axis} exampleUrl="/axis" tileStyles={tileStyles}/>);
}
