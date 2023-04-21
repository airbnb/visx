import React from 'react';
import { AreaStack } from '@visx/shape';
import { GradientOrangeRed } from '@visx/gradient';
import browserUsage from '@visx/mock-data/lib/mocks/browserUsage';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from 'd3-time-format';
var data = browserUsage;
var keys = Object.keys(data[0]).filter(function (k) { return k !== 'date'; });
var parseDate = timeParse('%Y %b %d');
export var background = '#f38181';
var getDate = function (d) { return parseDate(d.date).valueOf(); };
var getY0 = function (d) { return d[0] / 100; };
var getY1 = function (d) { return d[1] / 100; };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? { top: 0, right: 0, bottom: 0, left: 0 } : _b, _c = _a.events, events = _c === void 0 ? false : _c;
    // bounds
    var yMax = height - margin.top - margin.bottom;
    var xMax = width - margin.left - margin.right;
    // scales
    var xScale = scaleTime({
        range: [0, xMax],
        domain: [Math.min.apply(Math, data.map(getDate)), Math.max.apply(Math, data.map(getDate))],
    });
    var yScale = scaleLinear({
        range: [yMax, 0],
    });
    return width < 10 ? null : (<svg width={width} height={height}>
      <GradientOrangeRed id="stacked-area-orangered"/>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
      <AreaStack top={margin.top} left={margin.left} keys={keys} data={data} x={function (d) { var _a; return (_a = xScale(getDate(d.data))) !== null && _a !== void 0 ? _a : 0; }} y0={function (d) { var _a; return (_a = yScale(getY0(d))) !== null && _a !== void 0 ? _a : 0; }} y1={function (d) { var _a; return (_a = yScale(getY1(d))) !== null && _a !== void 0 ? _a : 0; }}>
        {function (_a) {
        var stacks = _a.stacks, path = _a.path;
        return stacks.map(function (stack) { return (<path key={"stack-" + stack.key} d={path(stack) || ''} stroke="transparent" fill="url(#stacked-area-orangered)" onClick={function () {
            if (events)
                alert("" + stack.key);
        }}/>); });
    }}
      </AreaStack>
    </svg>);
}
