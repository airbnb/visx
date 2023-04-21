import React from 'react';
import BrushReadme from '!!raw-loader!../../../../visx-brush/Readme.md';
import Brush from '../../../../visx-brush/src/Brush';
import DocPage from '../../components/DocPage';
import BrushTile from '../../components/Gallery/BrushTile';
var components = [Brush];
var examples = [BrushTile];
function BrushDocs() {
    return (<DocPage components={components} examples={examples} readme={BrushReadme} visxPackage="brush"/>);
}
export default BrushDocs;
