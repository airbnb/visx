import React from 'react';
import HeatmapReadme from '!!raw-loader!../../../../visx-heatmap/Readme.md';
import HeatmapRect from '../../../../visx-heatmap/src/heatmaps/HeatmapRect';
import HeatmapCircle from '../../../../visx-heatmap/src/heatmaps/HeatmapCircle';
import DocPage from '../../components/DocPage';
import HeatmapsTile from '../../components/Gallery/HeatmapsTile';
var components = [HeatmapRect, HeatmapCircle];
var examples = [HeatmapsTile];
function HeatmapDocs() {
    return (<DocPage components={components} examples={examples} readme={HeatmapReadme} visxPackage="heatmap"/>);
}
export default HeatmapDocs;
