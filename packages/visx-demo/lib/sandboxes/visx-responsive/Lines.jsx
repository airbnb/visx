import React from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import generateDateValue from '@visx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent, max } from 'd3-array';
var lineCount = 12;
var series = new Array(lineCount).fill(null).map(function (_, i) { return generateDateValue(25, i / 47); });
var allData = series.reduce(function (rec, d) { return rec.concat(d); }, []);
// data accessors
var getX = function (d) { return d.date; };
var getY = function (d) { return d.value; };
// scales
var xScale = scaleTime({
    domain: extent(allData, getX),
});
var yScale = scaleLinear({
    domain: [0, max(allData, getY)],
});
function Lines(_a) {
    var width = _a.width, height = _a.height;
    // bounds
    var lineHeight = height / lineCount;
    // update scales
    xScale.range([0, width]);
    yScale.range([lineHeight, 0]);
    return (<svg width={width} height={height}>
      {width > 8 &&
        series.map(function (lineData, i) { return (<Group key={"lines-" + i} top={i * lineHeight}>
            <LinePath data={lineData} x={function (d) { var _a; return (_a = xScale(getX(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = yScale(getY(d))) !== null && _a !== void 0 ? _a : 0; }} stroke="#ffffff" strokeWidth={1.5} shapeRendering="geometricPrecision"/>
          </Group>); })}
    </svg>);
}
export default Lines;
