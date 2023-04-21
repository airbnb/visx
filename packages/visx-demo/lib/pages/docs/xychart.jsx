import React from 'react';
import XYChartReadme from '!!raw-loader!../../../../visx-xychart/README.md';
import * as XYChartPackage from '../../../../visx-xychart/src';
import DocPage from '../../components/DocPage';
import XYChartTile from '../../components/Gallery/XYChartTile';
var components = Object.values(XYChartPackage);
var examples = [XYChartTile];
function XYChartDocs() {
    return (<DocPage components={components} examples={examples} readme={XYChartReadme} visxPackage="xychart"/>);
}
export default XYChartDocs;
