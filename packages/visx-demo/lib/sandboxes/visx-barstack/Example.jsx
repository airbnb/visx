var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisBottom } from '@visx/axis';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';
var purple1 = '#6c5efb';
var purple2 = '#c998ff';
export var purple3 = '#a44afe';
export var background = '#eaedff';
var defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };
var tooltipStyles = __assign(__assign({}, defaultStyles), { minWidth: 60, backgroundColor: 'rgba(0,0,0,0.9)', color: 'white' });
var data = cityTemperature.slice(0, 12);
var keys = Object.keys(data[0]).filter(function (d) { return d !== 'date'; });
var temperatureTotals = data.reduce(function (allTotals, currentDate) {
    var totalTemperature = keys.reduce(function (dailyTotal, k) {
        dailyTotal += Number(currentDate[k]);
        return dailyTotal;
    }, 0);
    allTotals.push(totalTemperature);
    return allTotals;
}, []);
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
var temperatureScale = scaleLinear({
    domain: [0, Math.max.apply(Math, temperatureTotals)],
    nice: true,
});
var colorScale = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3],
});
var tooltipTimeout;
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b, _c = _a.margin, margin = _c === void 0 ? defaultMargin : _c;
    var _d = useTooltip(), tooltipOpen = _d.tooltipOpen, tooltipLeft = _d.tooltipLeft, tooltipTop = _d.tooltipTop, tooltipData = _d.tooltipData, hideTooltip = _d.hideTooltip, showTooltip = _d.showTooltip;
    var _e = useTooltipInPortal({
        // TooltipInPortal is rendered in a separate child of <body /> and positioned
        // with page coordinates which should be updated on scroll. consider using
        // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
        scroll: true,
    }), containerRef = _e.containerRef, TooltipInPortal = _e.TooltipInPortal;
    if (width < 10)
        return null;
    // bounds
    var xMax = width;
    var yMax = height - margin.top - 100;
    dateScale.rangeRound([0, xMax]);
    temperatureScale.range([yMax, 0]);
    return width < 10 ? null : (<div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
        <Grid top={margin.top} left={margin.left} xScale={dateScale} yScale={temperatureScale} width={xMax} height={yMax} stroke="black" strokeOpacity={0.1} xOffset={dateScale.bandwidth() / 2}/>
        <Group top={margin.top}>
          <BarStack data={data} keys={keys} x={getDate} xScale={dateScale} yScale={temperatureScale} color={colorScale}>
            {function (barStacks) {
        return barStacks.map(function (barStack) {
            return barStack.bars.map(function (bar) { return (<rect key={"bar-stack-" + barStack.index + "-" + bar.index} x={bar.x} y={bar.y} height={bar.height} width={bar.width} fill={bar.color} onClick={function () {
                if (events)
                    alert("clicked: " + JSON.stringify(bar));
            }} onMouseLeave={function () {
                tooltipTimeout = window.setTimeout(function () {
                    hideTooltip();
                }, 300);
            }} onMouseMove={function (event) {
                if (tooltipTimeout)
                    clearTimeout(tooltipTimeout);
                // TooltipInPortal expects coordinates to be relative to containerRef
                // localPoint returns coordinates relative to the nearest SVG, which
                // is what containerRef is set to in this example.
                var eventSvgCoords = localPoint(event);
                var left = bar.x + bar.width / 2;
                showTooltip({
                    tooltipData: bar,
                    tooltipTop: eventSvgCoords === null || eventSvgCoords === void 0 ? void 0 : eventSvgCoords.y,
                    tooltipLeft: left,
                });
            }}/>); });
        });
    }}
          </BarStack>
        </Group>
        <AxisBottom top={yMax + margin.top} scale={dateScale} tickFormat={formatDate} stroke={purple3} tickStroke={purple3} tickLabelProps={{
        fill: purple3,
        fontSize: 11,
        textAnchor: 'middle',
    }}/>
      </svg>
      <div style={{
        position: 'absolute',
        top: margin.top / 2 - 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '14px',
    }}>
        <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0"/>
      </div>

      {tooltipOpen && tooltipData && (<TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
          <div>
            <small>{formatDate(getDate(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>)}
    </div>);
}
