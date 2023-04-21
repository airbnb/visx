import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../visx-glyph/Readme.md';
import * as Glyph from '../../../../visx-glyph/src';
import DocPage from '../../components/DocPage';
import GlyphsTile from '../../components/Gallery/GlyphsTile';
import LegendsTile from '../../components/Gallery/LegendsTile';
var components = Object.values(Glyph).sort(function (a, b) {
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
var examples = [GlyphsTile, LegendsTile];
function GlyphDocs() {
    return (<DocPage components={components} examples={examples} readme={GlyphReadme} visxPackage="glyph"/>);
}
export default GlyphDocs;
