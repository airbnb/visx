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
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
var purple1 = '#6c5efb';
var purple2 = '#c998ff';
export var purple3 = '#a44afe';
export var background = '#eaedff';
var defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 };
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
var temperatureScale = scaleLinear({
    domain: [0, Math.max.apply(Math, temperatureTotals)],
    nice: true,
});
var dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2,
});
var colorScale = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3],
});
var tooltipTimeout;
export default withTooltip(function (_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b, _c = _a.margin, margin = _c === void 0 ? defaultMargin : _c, tooltipOpen = _a.tooltipOpen, tooltipLeft = _a.tooltipLeft, tooltipTop = _a.tooltipTop, tooltipData = _a.tooltipData, hideTooltip = _a.hideTooltip, showTooltip = _a.showTooltip;
    // bounds
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    temperatureScale.rangeRound([0, xMax]);
    dateScale.rangeRound([yMax, 0]);
    return width < 10 ? null : (<div>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={background} rx={14}/>
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal data={data} keys={keys} height={yMax} y={getDate} xScale={temperatureScale} yScale={dateScale} color={colorScale}>
              {function (barStacks) {
        return barStacks.map(function (barStack) {
            return barStack.bars.map(function (bar) { return (<rect key={"barstack-horizontal-" + barStack.index + "-" + bar.index} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.color} onClick={function () {
                if (events)
                    alert("clicked: " + JSON.stringify(bar));
            }} onMouseLeave={function () {
                tooltipTimeout = window.setTimeout(function () {
                    hideTooltip();
                }, 300);
            }} onMouseMove={function () {
                if (tooltipTimeout)
                    clearTimeout(tooltipTimeout);
                var top = bar.y + margin.top;
                var left = bar.x + bar.width + margin.left;
                showTooltip({
                    tooltipData: bar,
                    tooltipTop: top,
                    tooltipLeft: left,
                });
            }}/>); });
        });
    }}
            </BarStackHorizontal>
            <AxisLeft hideAxisLine hideTicks scale={dateScale} tickFormat={formatDate} stroke={purple3} tickStroke={purple3} tickLabelProps={{
        fill: purple3,
        fontSize: 11,
        textAnchor: 'end',
        dy: '0.33em',
    }}/>
            <AxisBottom top={yMax} scale={temperatureScale} stroke={purple3} tickStroke={purple3} tickLabelProps={{
        fill: purple3,
        fontSize: 11,
        textAnchor: 'middle',
    }}/>
          </Group>
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
        {tooltipOpen && tooltipData && (<Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
            <div>
              <small>{formatDate(getDate(tooltipData.bar.data))}</small>
            </div>
          </Tooltip>)}
      </div>);
});
