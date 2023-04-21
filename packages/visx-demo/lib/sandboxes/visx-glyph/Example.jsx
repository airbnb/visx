/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Group } from '@visx/group';
import { Glyph as CustomGlyph, GlyphCircle, GlyphCross, GlyphDiamond, GlyphSquare, GlyphStar, GlyphTriangle, GlyphWye, } from '@visx/glyph';
import { LinePath } from '@visx/shape';
import genDateValue from '@visx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@visx/scale';
import { curveMonotoneX, curveBasis } from '@visx/curve';
var defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };
// colors
export var primaryColor = '#8921e0';
export var secondaryColor = '#00f2ff';
var contrastColor = '#ffffff';
// Glyphs to render
var Glyphs = [
    GlyphCircle,
    GlyphCross,
    GlyphDiamond,
    GlyphStar,
    GlyphTriangle,
    GlyphSquare,
    GlyphWye,
    function (_a) {
        var left = _a.left, top = _a.top;
        return (<CustomGlyph left={left} top={top}>
      <circle r={12} fill={secondaryColor}/>
      <text fontSize={16} textAnchor="middle" dy="0.5em">
        {'💜'}
      </text>
    </CustomGlyph>);
    },
];
var data = genDateValue(Glyphs.length * 2, 0.91);
// accessors
var date = function (d) { return d.date.valueOf(); };
var value = function (d) { return d.value; };
// scales
var xScale = scaleTime({
    domain: [Math.min.apply(Math, data.map(date)), Math.max.apply(Math, data.map(date))],
});
var yScale = scaleLinear({
    domain: [0, Math.max.apply(Math, data.map(value))],
});
// positions
var getX = function (d) { var _a; return (_a = xScale(date(d))) !== null && _a !== void 0 ? _a : 0; };
var getY = function (d) { var _a; return (_a = yScale(value(d))) !== null && _a !== void 0 ? _a : 0; };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    if (width < 10)
        return null;
    // bounds
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    // update scale range to match bounds
    xScale.range([0, innerWidth]);
    yScale.range([innerHeight, 0]);
    return (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={secondaryColor} rx={14}/>
      <Group left={margin.left} top={margin.top}>
        <LinePath data={data} x={getX} y={getY} stroke={primaryColor} strokeWidth={2} strokeDasharray="2,2" curve={curveBasis}/>
        <LinePath data={data} x={getX} y={getY} stroke={primaryColor} strokeWidth={2} curve={curveMonotoneX}/>
        {data.map(function (d, i) {
        var CurrGlyph = Glyphs[i % Glyphs.length];
        var left = getX(d);
        var top = getY(d);
        return (<g key={"line-glyph-" + i}>
              <CurrGlyph left={left} top={top} size={110} stroke={secondaryColor} strokeWidth={10}/>
              <CurrGlyph left={left} top={top} size={110} fill={i % 2 === 0 ? primaryColor : contrastColor} stroke={i % 2 === 0 ? contrastColor : primaryColor} strokeWidth={2}/>
            </g>);
    })}
      </Group>
    </svg>);
}
