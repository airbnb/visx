/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Inspired by Mike Bostock's Streamgraph & Lee Byron’s test data generator:
 * https://bl.ocks.org/mbostock/4060954
 */
import React from 'react';
import { Stack } from '@visx/shape';
import { PatternCircles, PatternWaves } from '@visx/pattern';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { transpose } from 'd3-array';
import { animated, useSpring } from '@react-spring/web';
import useForceUpdate from './useForceUpdate';
import generateData from './generateData';
// constants
var NUM_LAYERS = 20;
var SAMPLES_PER_LAYER = 200;
var BUMPS_PER_LAYER = 10;
export var BACKGROUND = '#ffdede';
// utils
var range = function (n) { return Array.from(new Array(n), function (_, i) { return i; }); };
var keys = range(NUM_LAYERS);
// scales
var xScale = scaleLinear({
    domain: [0, SAMPLES_PER_LAYER - 1],
});
var yScale = scaleLinear({
    domain: [-30, 50],
});
var colorScale = scaleOrdinal({
    domain: keys,
    range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
});
var patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
});
var getY0 = function (d) { var _a; return (_a = yScale(d[0])) !== null && _a !== void 0 ? _a : 0; };
var getY1 = function (d) { var _a; return (_a = yScale(d[1])) !== null && _a !== void 0 ? _a : 0; };
export default function Streamgraph(_a) {
    var width = _a.width, height = _a.height, _b = _a.animate, animate = _b === void 0 ? true : _b;
    var forceUpdate = useForceUpdate();
    var handlePress = function () { return forceUpdate(); };
    if (width < 10)
        return null;
    xScale.range([0, width]);
    yScale.range([height, 0]);
    // generate layers in render to update on touch
    var layers = transpose(keys.map(function () { return generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER); }));
    return (<svg width={width} height={height}>
      <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#036ecf" complement/>
      <PatternWaves id="cherry" height={12} width={12} fill="transparent" stroke="#232493" strokeWidth={1}/>
      <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement/>
      <PatternCircles complement id="circles" height={60} width={60} radius={10} fill="transparent"/>

      <g onClick={handlePress} onTouchStart={handlePress}>
        <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14}/>
        <Stack data={layers} keys={keys} offset="wiggle" color={colorScale} x={function (_, i) { var _a; return (_a = xScale(i)) !== null && _a !== void 0 ? _a : 0; }} y0={getY0} y1={getY1}>
          {function (_a) {
        var stacks = _a.stacks, path = _a.path;
        return stacks.map(function (stack) {
            // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
            var pathString = path(stack) || '';
            var tweened = animate ? useSpring({ pathString: pathString }) : { pathString: pathString };
            var color = colorScale(stack.key);
            var pattern = patternScale(stack.key);
            return (<g key={"series-" + stack.key}>
                  <animated.path d={tweened.pathString} fill={color}/>
                  <animated.path d={tweened.pathString} fill={"url(#" + pattern + ")"}/>
                </g>);
        });
    }}
        </Stack>
      </g>
    </svg>);
}
