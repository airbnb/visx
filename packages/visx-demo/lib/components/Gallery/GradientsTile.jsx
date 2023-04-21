import React from 'react';
import Gradient from '../../sandboxes/visx-gradient/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-gradient/package.json';
var tileStyles = { background: 'white', boxShadow: '0 1px 6px rgba(0,0,0,0.1)' };
var detailsStyles = { color: '#333' };
export default function GradientsTile() {
    return (<GalleryTile title="Gradients" description="<Gradient.LinearGradient /> <Gradient.RadialGradient />" detailsStyles={detailsStyles} exampleRenderer={Gradient} exampleUrl="/gradients" tileStyles={tileStyles}/>);
}
