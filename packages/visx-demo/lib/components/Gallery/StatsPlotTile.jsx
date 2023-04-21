import React from 'react';
import StatsPlot from '../../sandboxes/visx-stats/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-stats/package.json';
var tileStyles = { background: '#8a88e3' };
var detailsStyles = { color: '#ffffff', zIndex: 1 };
export default function StatsPlotTile() {
    return (<GalleryTile title="Stats Plots" description="<BoxPlot /> & <ViolinPlot />" exampleRenderer={StatsPlot} exampleUrl="/statsplot" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
