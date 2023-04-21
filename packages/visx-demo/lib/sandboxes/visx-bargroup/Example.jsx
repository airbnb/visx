import React from 'react';
import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
var blue = '#aeeef8';
export var green = '#e5fd3d';
var purple = '#9caff6';
export var background = '#612efb';
var data = cityTemperature.slice(0, 8);
var keys = Object.keys(data[0]).filter(function (d) { return d !== 'date'; });
var defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };
var parseDate = timeParse('%Y-%m-%d');
var format = timeFormat('%b %d');
var formatDate = function (date) { return format(parseDate(date)); };
// accessors
var getDate = function (d) { return d.date; };
// scales
var dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2,
});
var cityScale = scaleBand({
    domain: keys,
    padding: 0.1,
});
var tempScale = scaleLinear({
    domain: [0, Math.max.apply(Math, data.map(function (d) { return Math.max.apply(Math, keys.map(function (key) { return Number(d[key]); })); }))],
});
var colorScale = scaleOrdinal({
    domain: keys,
    range: [blue, green, purple],
});
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b, _c = _a.margin, margin = _c === void 0 ? defaultMargin : _c;
    // bounds
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    // update scale output dimensions
    dateScale.rangeRound([0, xMax]);
    cityScale.rangeRound([0, dateScale.bandwidth()]);
    tempScale.range([yMax, 0]);
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
      <Group top={margin.top} left={margin.left}>
        <BarGroup data={data} keys={keys} height={yMax} x0={getDate} x0Scale={dateScale} x1Scale={cityScale} yScale={tempScale} color={colorScale}>
          {function (barGroups) {
        return barGroups.map(function (barGroup) { return (<Group key={"bar-group-" + barGroup.index + "-" + barGroup.x0} left={barGroup.x0}>
                {barGroup.bars.map(function (bar) { return (<rect key={"bar-group-bar-" + barGroup.index + "-" + bar.index + "-" + bar.value + "-" + bar.key} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.color} rx={4} onClick={function () {
            if (!events)
                return;
            var key = bar.key, value = bar.value;
            alert(JSON.stringify({ key: key, value: value }));
        }}/>); })}
              </Group>); });
    }}
        </BarGroup>
      </Group>
      <AxisBottom top={yMax + margin.top} tickFormat={formatDate} scale={dateScale} stroke={green} tickStroke={green} hideAxisLine tickLabelProps={{
        fill: green,
        fontSize: 11,
        textAnchor: 'middle',
    }}/>
    </svg>);
}
