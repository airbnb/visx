import React from 'react';
import GradientReadme from '!!raw-loader!../../../../visx-gradient/Readme.md';
import * as Gradients from '../../../../visx-gradient/src';
import DocPage from '../../components/DocPage';
import GradientsTile from '../../components/Gallery/GradientsTile';
import AreaTile from '../../components/Gallery/AreaTile';
import BarsTile from '../../components/Gallery/BarsTile';
import ChordTile from '../../components/Gallery/ChordTile';
import DragIITile from '../../components/Gallery/DragIITile';
import PiesTile from '../../components/Gallery/PiesTile';
var components = Object.values(Gradients).sort(function (a, b) {
    var _a, _b, _c, _d;
    // @ts-expect-errorTS doesn't know about docgenInfo
    var aName = (_b = (_a = a === null || a === void 0 ? void 0 : a.__docgenInfo) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : '';
    // @ts-expect-errorTS doesn't know about docgenInfo
    var bName = (_d = (_c = b === null || b === void 0 ? void 0 : b.__docgenInfo) === null || _c === void 0 ? void 0 : _c.displayName) !== null && _d !== void 0 ? _d : '';
    return ((aName === 'LinearGradient' && -2) ||
        (bName === 'LinearGradient' && 2) ||
        (aName === 'RadialGradient' && -1) ||
        (bName === 'RadialGradient' && 1) ||
        aName.localeCompare(bName));
});
var examples = [GradientsTile, PiesTile, ChordTile, AreaTile, BarsTile, DragIITile];
function GradientDocs() {
    return (<DocPage components={components} examples={examples} readme={GradientReadme} visxPackage="gradient"/>);
}
export default GradientDocs;
