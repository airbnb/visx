import React from 'react';
import { BarGroupHorizontal, Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft } from '@visx/axis';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
var blue = '#aeeef8';
export var green = '#e5fd3d';
var purple = '#9caff6';
export var background = '#612efb';
var defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };
var parseDate = timeParse('%Y-%m-%d');
var format = timeFormat('%b %d');
var formatDate = function (date) { return format(parseDate(date)); };
function max(arr, fn) {
    return Math.max.apply(Math, arr.map(fn));
}
var data = cityTemperature.slice(0, 4);
var keys = Object.keys(data[0]).filter(function (d) { return d !== 'date'; });
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
    domain: [0, max(data, function (d) { return max(keys, function (key) { return Number(d[key]); }); })],
});
var colorScale = scaleOrdinal({
    domain: keys,
    range: [blue, green, purple],
});
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b, _c = _a.events, events = _c === void 0 ? false : _c;
    // bounds
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    // update scale output dimensions
    dateScale.rangeRound([0, yMax]);
    cityScale.rangeRound([0, dateScale.bandwidth()]);
    tempScale.rangeRound([0, xMax]);
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
      <Group top={margin.top} left={margin.left}>
        <BarGroupHorizontal data={data} keys={keys} width={xMax} y0={getDate} y0Scale={dateScale} y1Scale={cityScale} xScale={tempScale} color={colorScale}>
          {function (barGroups) {
        return barGroups.map(function (barGroup) { return (<Group key={"bar-group-horizontal-" + barGroup.index + "-" + barGroup.y0} top={barGroup.y0}>
                {barGroup.bars.map(function (bar) { return (<Bar key={barGroup.index + "-" + bar.index + "-" + bar.key} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.color} rx={4} onClick={function () {
            if (events)
                alert(bar.key + " (" + bar.value + ") - " + JSON.stringify(bar));
        }}/>); })}
              </Group>); });
    }}
        </BarGroupHorizontal>
        <AxisLeft scale={dateScale} stroke={green} tickStroke={green} tickFormat={formatDate} hideAxisLine tickLabelProps={{
        fill: green,
        fontSize: 11,
        textAnchor: 'end',
        dy: '0.33em',
    }}/>
      </Group>
    </svg>);
}
