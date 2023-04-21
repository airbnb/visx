var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import { Group } from '@visx/group';
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';
var orange = '#ff9933';
export var pumpkin = '#f5810c';
var silver = '#d9d9d9';
export var background = '#FAF7E9';
var degrees = 360;
var data = letterFrequency.slice(2, 12);
var y = function (d) { return d.frequency; };
var genAngles = function (length) {
    return __spreadArrays(new Array(length + 1)).map(function (_, i) { return ({
        angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
    }); });
};
var genPoints = function (length, radius) {
    var step = (Math.PI * 2) / length;
    return __spreadArrays(new Array(length)).map(function (_, i) { return ({
        x: radius * Math.sin(i * step),
        y: radius * Math.cos(i * step),
    }); });
};
function genPolygonPoints(dataArray, scale, getValue) {
    var step = (Math.PI * 2) / dataArray.length;
    var points = new Array(dataArray.length).fill({ x: 0, y: 0 });
    var pointString = new Array(dataArray.length + 1).fill('').reduce(function (res, _, i) {
        if (i > dataArray.length)
            return res;
        var xVal = scale(getValue(dataArray[i - 1])) * Math.sin(i * step);
        var yVal = scale(getValue(dataArray[i - 1])) * Math.cos(i * step);
        points[i - 1] = { x: xVal, y: yVal };
        res += xVal + "," + yVal + " ";
        return res;
    });
    return { points: points, pointString: pointString };
}
var defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.levels, levels = _b === void 0 ? 5 : _b, _c = _a.margin, margin = _c === void 0 ? defaultMargin : _c;
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    var radius = Math.min(xMax, yMax) / 2;
    var radialScale = scaleLinear({
        range: [0, Math.PI * 2],
        domain: [degrees, 0],
    });
    var yScale = scaleLinear({
        range: [0, radius],
        domain: [0, Math.max.apply(Math, data.map(y))],
    });
    var webs = genAngles(data.length);
    var points = genPoints(data.length, radius);
    var polygonPoints = genPolygonPoints(data, function (d) { var _a; return (_a = yScale(d)) !== null && _a !== void 0 ? _a : 0; }, y);
    var zeroPoint = new Point({ x: 0, y: 0 });
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect fill={background} width={width} height={height} rx={14}/>
      <Group top={height / 2 - margin.top} left={width / 2}>
        {__spreadArrays(new Array(levels)).map(function (_, i) { return (<LineRadial key={"web-" + i} data={webs} angle={function (d) { var _a; return (_a = radialScale(d.angle)) !== null && _a !== void 0 ? _a : 0; }} radius={((i + 1) * radius) / levels} fill="none" stroke={silver} strokeWidth={2} strokeOpacity={0.8} strokeLinecap="round"/>); })}
        {__spreadArrays(new Array(data.length)).map(function (_, i) { return (<Line key={"radar-line-" + i} from={zeroPoint} to={points[i]} stroke={silver}/>); })}
        <polygon points={polygonPoints.pointString} fill={orange} fillOpacity={0.3} stroke={orange} strokeWidth={1}/>
        {polygonPoints.points.map(function (point, i) { return (<circle key={"radar-point-" + i} cx={point.x} cy={point.y} r={4} fill={pumpkin}/>); })}
      </Group>
    </svg>);
}
