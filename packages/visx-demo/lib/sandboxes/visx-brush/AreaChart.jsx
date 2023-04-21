import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
// Initialize some variables
var axisColor = '#fff';
var axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};
var axisLeftTickLabelProps = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
    fill: axisColor,
};
// accessors
var getDate = function (d) { return new Date(d.date); };
var getStockValue = function (d) { return d.close; };
export default function AreaChart(_a) {
    var data = _a.data, gradientColor = _a.gradientColor, width = _a.width, yMax = _a.yMax, margin = _a.margin, xScale = _a.xScale, yScale = _a.yScale, _b = _a.hideBottomAxis, hideBottomAxis = _b === void 0 ? false : _b, _c = _a.hideLeftAxis, hideLeftAxis = _c === void 0 ? false : _c, top = _a.top, left = _a.left, children = _a.children;
    if (width < 10)
        return null;
    return (<Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient id="gradient" from={gradientColor} fromOpacity={1} to={gradientColor} toOpacity={0.2}/>
      <AreaClosed data={data} x={function (d) { return xScale(getDate(d)) || 0; }} y={function (d) { return yScale(getStockValue(d)) || 0; }} yScale={yScale} strokeWidth={1} stroke="url(#gradient)" fill="url(#gradient)" curve={curveMonotoneX}/>
      {!hideBottomAxis && (<AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} stroke={axisColor} tickStroke={axisColor} tickLabelProps={axisBottomTickLabelProps}/>)}
      {!hideLeftAxis && (<AxisLeft scale={yScale} numTicks={5} stroke={axisColor} tickStroke={axisColor} tickLabelProps={axisLeftTickLabelProps}/>)}
      {children}
    </Group>);
}
