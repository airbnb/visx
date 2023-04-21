import React from 'react';
import ShapeReadme from '!!raw-loader!../../../../visx-shape/Readme.md';
import * as Shapes from '../../../../visx-shape/src';
import DocPage from '../../components/DocPage';
import LineRadialTile from '../../components/Gallery/LineRadialTile';
import PiesTile from '../../components/Gallery/PiesTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';
import StackedAreasTile from '../../components/Gallery/StackedAreasTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import BarGroupTile from '../../components/Gallery/BarGroupTile';
import RadarTile from '../../components/Gallery/RadarTile';
import LinkTypesTile from '../../components/Gallery/LinkTypesTile';
var components = Object.values(Shapes).sort(function (a, b) {
    var _a, _b, _c, _d;
    // @ts-expect-errorTS doesn't know about docgenInfo
    return ((_b = (_a = a === null || a === void 0 ? void 0 : a.__docgenInfo) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : '').localeCompare((_d = (_c = 
    // @ts-expect-errorTS doesn't know about docgenInfo
    b === null || 
    // @ts-expect-errorTS doesn't know about docgenInfo
    b === void 0 ? void 0 : 
    // @ts-expect-errorTS doesn't know about docgenInfo
    b.__docgenInfo) === null || _c === void 0 ? void 0 : _c.displayName) !== null && _d !== void 0 ? _d : '');
});
var examples = [
    LineRadialTile,
    PiesTile,
    StreamGraphTile,
    ThresholdTile,
    StackedAreasTile,
    BarStackHorizontalTile,
    BarGroupTile,
    RadarTile,
    LinkTypesTile,
];
function ShapeDocs() {
    return (<DocPage components={components} examples={examples} readme={ShapeReadme} visxPackage="shape"/>);
}
export default ShapeDocs;
