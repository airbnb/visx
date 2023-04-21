import React from 'react';
import { Polygon } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { GradientPinkRed } from '@visx/gradient';
export var background = '#7f82e3';
var polygonSize = 25;
var defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };
var polygons = [
    {
        sides: 3,
        fill: 'rgb(174, 238, 248)',
        rotate: 90,
    },
    {
        sides: 4,
        fill: 'rgb(229, 253, 61)',
        rotate: 45,
    },
    {
        sides: 6,
        fill: 'rgb(229, 130, 255)',
        rotate: 0,
    },
    {
        sides: 8,
        fill: 'url(#polygon-pink)',
        rotate: 0,
    },
];
var yScale = scaleBand({
    domain: polygons.map(function (p, i) { return i; }),
    padding: 0.8,
});
export default function (_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    yScale.rangeRound([0, height - margin.top - margin.bottom]);
    var centerX = (width - margin.left - margin.right) / 2;
    return (<svg width={width} height={height}>
      <rect width={width} height={height} fill={background} rx={14}/>
      <GradientPinkRed id="polygon-pink"/>
      {polygons.map(function (polygon, i) { return (<Group key={"polygon-" + i} top={(yScale(i) || 0) + polygonSize / 2} left={margin.left + centerX}>
          <Polygon sides={polygon.sides} size={polygonSize} fill={polygon.fill} rotate={polygon.rotate}/>
        </Group>); })}
    </svg>);
}
