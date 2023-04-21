import React from 'react';
import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
export var background = '#f3f3f3';
// accessors
var date = function (d) { return new Date(d.date).valueOf(); };
var ny = function (d) { return Number(d['New York']); };
var sf = function (d) { return Number(d['San Francisco']); };
// scales
var timeScale = scaleTime({
    domain: [Math.min.apply(Math, cityTemperature.map(date)), Math.max.apply(Math, cityTemperature.map(date))],
});
var temperatureScale = scaleLinear({
    domain: [
        Math.min.apply(Math, cityTemperature.map(function (d) { return Math.min(ny(d), sf(d)); })),
        Math.max.apply(Math, cityTemperature.map(function (d) { return Math.max(ny(d), sf(d)); })),
    ],
    nice: true,
});
var defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };
export default function Theshold(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    if (width < 10)
        return null;
    // bounds
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    timeScale.range([0, xMax]);
    temperatureScale.range([yMax, 0]);
    return (<div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0"/>
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0"/>
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0"/>
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5}/>
          <AxisLeft scale={temperatureScale}/>
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold id={"" + Math.random()} data={cityTemperature} x={function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }} y0={function (d) { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }} y1={function (d) { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }} clipAboveTo={0} clipBelowTo={yMax} curve={curveBasis} belowAreaProps={{
        fill: 'violet',
        fillOpacity: 0.4,
    }} aboveAreaProps={{
        fill: 'green',
        fillOpacity: 0.4,
    }}/>
          <LinePath data={cityTemperature} curve={curveBasis} x={function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }} stroke="#222" strokeWidth={1.5} strokeOpacity={0.8} strokeDasharray="1,2"/>
          <LinePath data={cityTemperature} curve={curveBasis} x={function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }} stroke="#222" strokeWidth={1.5}/>
        </Group>
      </svg>
    </div>);
}
