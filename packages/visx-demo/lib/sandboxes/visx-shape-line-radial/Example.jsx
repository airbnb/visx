/**
 * Animated radial line example using svg dash offset trick. See here for more
 * https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html
 */
import React, { useRef, useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { LineRadial } from '@visx/shape';
import { scaleTime, scaleLog } from '@visx/scale';
import { curveBasisOpen } from '@visx/curve';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft } from '@visx/axis';
import { GridRadial, GridAngle } from '@visx/grid';
import { animated, useSpring } from '@react-spring/web';
var green = '#e5fd3d';
export var blue = '#aeeef8';
var darkgreen = '#dff84d';
export var background = '#744cca';
var darkbackground = '#603FA8';
var strokeColor = '#744cca';
var springConfig = {
    tension: 20,
};
// utils
function extent(data, value) {
    var values = data.map(value);
    return [Math.min.apply(Math, values), Math.max.apply(Math, values)];
}
// accessors
var date = function (d) { return new Date(d.date).valueOf(); };
var close = function (d) { return d.close; };
var formatTicks = function (val) { return String(val); };
// scales
var xScale = scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(appleStock, date),
});
var yScale = scaleLog({
    domain: extent(appleStock, close),
});
var angle = function (d) { var _a; return (_a = xScale(date(d))) !== null && _a !== void 0 ? _a : 0; };
var radius = function (d) { var _a; return (_a = yScale(close(d))) !== null && _a !== void 0 ? _a : 0; };
var padding = 20;
var firstPoint = appleStock[0];
var lastPoint = appleStock[appleStock.length - 1];
function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.animate, animate = _b === void 0 ? true : _b;
    var lineRef = useRef(null);
    var _c = useState(0), lineLength = _c[0], setLineLength = _c[1];
    var _d = useState(false), shouldAnimate = _d[0], setShouldAnimate = _d[1];
    var spring = useSpring({
        frame: shouldAnimate ? 0 : 1,
        config: springConfig,
        onRest: function () { return setShouldAnimate(false); },
    });
    // set line length once it is known after initial render
    var effectDependency = lineRef.current;
    useEffect(function () {
        if (lineRef.current) {
            setLineLength(lineRef.current.getTotalLength());
        }
    }, [effectDependency]);
    if (width < 10)
        return null;
    // Update scale output to match component dimensions
    yScale.range([0, height / 2 - padding]);
    var reverseYScale = yScale.copy().range(yScale.range().reverse());
    var handlePress = function () { return setShouldAnimate(true); };
    return (<>
      {animate && (<>
          <button type="button" onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>)}
      <svg width={width} height={height} onClick={function () { return setShouldAnimate(!shouldAnimate); }}>
        <LinearGradient from={green} to={blue} id="line-gradient"/>
        <rect width={width} height={height} fill={background} rx={14}/>
        <Group top={height / 2} left={width / 2}>
          <GridAngle scale={xScale} outerRadius={height / 2 - padding} stroke={green} strokeWidth={1} strokeOpacity={0.3} strokeDasharray="5,2" numTicks={20}/>
          <GridRadial scale={yScale} numTicks={5} stroke={blue} strokeWidth={1} fill={blue} fillOpacity={0.1} strokeOpacity={0.2}/>
          <AxisLeft top={-height / 2 + padding} scale={reverseYScale} numTicks={5} tickStroke="none" tickLabelProps={{
        fontSize: 8,
        fill: blue,
        fillOpacity: 1,
        textAnchor: 'middle',
        dx: '1em',
        dy: '-0.5em',
        stroke: strokeColor,
        strokeWidth: 0.5,
        paintOrder: 'stroke',
    }} tickFormat={formatTicks} hideAxisLine/>
          <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
            {function (_a) {
        var path = _a.path;
        var d = path(appleStock) || '';
        return (<>
                  <animated.path d={d} ref={lineRef} strokeWidth={2} strokeOpacity={0.8} strokeLinecap="round" fill="none" stroke={animate ? darkbackground : 'url(#line-gradient)'}/>
                  {shouldAnimate && (<animated.path d={d} strokeWidth={2} strokeOpacity={0.8} strokeLinecap="round" fill="none" stroke="url(#line-gradient)" strokeDashoffset={spring.frame.interpolate(function (v) { return v * lineLength; })} strokeDasharray={lineLength}/>)}
                </>);
    }}
          </LineRadial>

          {[firstPoint, lastPoint].map(function (d, i) {
        var _a, _b;
        var cx = (((_a = xScale(date(d))) !== null && _a !== void 0 ? _a : 0) * Math.PI) / 180;
        var cy = -((_b = yScale(close(d))) !== null && _b !== void 0 ? _b : 0);
        return <circle key={"line-cap-" + i} cx={cx} cy={cy} fill={darkgreen} r={3}/>;
    })}
        </Group>
      </svg>
    </>);
}
export default Example;
