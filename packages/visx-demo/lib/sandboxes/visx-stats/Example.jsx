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
import { Group } from '@visx/group';
import { ViolinPlot, BoxPlot } from '@visx/stats';
import { LinearGradient } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import genStats from '@visx/mock-data/lib/generators/genStats';
import { getSeededRandom, getRandomNormal } from '@visx/mock-data';
import { withTooltip, Tooltip, defaultStyles as defaultTooltipStyles } from '@visx/tooltip';
import { PatternLines } from '@visx/pattern';
// seeded randomness
var seededRandom = getSeededRandom(0.1);
var randomNormal = getRandomNormal.source(getSeededRandom(0.789))(4, 3);
var data = genStats(5, randomNormal, function () { return 10 * seededRandom(); });
// accessors
var x = function (d) { return d.boxPlot.x; };
var min = function (d) { return d.boxPlot.min; };
var max = function (d) { return d.boxPlot.max; };
var median = function (d) { return d.boxPlot.median; };
var firstQuartile = function (d) { return d.boxPlot.firstQuartile; };
var thirdQuartile = function (d) { return d.boxPlot.thirdQuartile; };
var outliers = function (d) { return d.boxPlot.outliers; };
export default withTooltip(function (_a) {
    var width = _a.width, height = _a.height, tooltipOpen = _a.tooltipOpen, tooltipLeft = _a.tooltipLeft, tooltipTop = _a.tooltipTop, tooltipData = _a.tooltipData, showTooltip = _a.showTooltip, hideTooltip = _a.hideTooltip;
    // bounds
    var xMax = width;
    var yMax = height - 120;
    // scales
    var xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4,
    });
    var values = data.reduce(function (allValues, _a) {
        var boxPlot = _a.boxPlot;
        allValues.push(boxPlot.min, boxPlot.max);
        return allValues;
    }, []);
    var minYValue = Math.min.apply(Math, values);
    var maxYValue = Math.max.apply(Math, values);
    var yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [minYValue, maxYValue],
    });
    var boxWidth = xScale.bandwidth();
    var constrainedWidth = Math.min(40, boxWidth);
    return width < 10 ? null : (<div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient id="statsplot" to="#8b6ce7" from="#87f2d4"/>
          <rect x={0} y={0} width={width} height={height} fill="url(#statsplot)" rx={14}/>
          <PatternLines id="hViolinLines" height={3} width={3} stroke="#ced4da" strokeWidth={1} 
    // fill="rgba(0,0,0,0.3)"
    orientation={['horizontal']}/>
          <Group top={40}>
            {data.map(function (d, i) { return (<g key={i}>
                <ViolinPlot data={d.binData} stroke="#dee2e6" left={xScale(x(d))} width={constrainedWidth} valueScale={yScale} fill="url(#hViolinLines)"/>
                <BoxPlot min={min(d)} max={max(d)} left={xScale(x(d)) + 0.3 * constrainedWidth} firstQuartile={firstQuartile(d)} thirdQuartile={thirdQuartile(d)} median={median(d)} boxWidth={constrainedWidth * 0.4} fill="#FFFFFF" fillOpacity={0.3} stroke="#FFFFFF" strokeWidth={2} valueScale={yScale} outliers={outliers(d)} minProps={{
        onMouseOver: function () {
            var _a;
            showTooltip({
                tooltipTop: (_a = yScale(min(d))) !== null && _a !== void 0 ? _a : 0 + 40,
                tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                tooltipData: {
                    min: min(d),
                    name: x(d),
                },
            });
        },
        onMouseLeave: function () {
            hideTooltip();
        },
    }} maxProps={{
        onMouseOver: function () {
            var _a;
            showTooltip({
                tooltipTop: (_a = yScale(max(d))) !== null && _a !== void 0 ? _a : 0 + 40,
                tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                tooltipData: {
                    max: max(d),
                    name: x(d),
                },
            });
        },
        onMouseLeave: function () {
            hideTooltip();
        },
    }} boxProps={{
        onMouseOver: function () {
            var _a;
            showTooltip({
                tooltipTop: (_a = yScale(median(d))) !== null && _a !== void 0 ? _a : 0 + 40,
                tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                tooltipData: __assign(__assign({}, d.boxPlot), { name: x(d) }),
            });
        },
        onMouseLeave: function () {
            hideTooltip();
        },
    }} medianProps={{
        style: {
            stroke: 'white',
        },
        onMouseOver: function () {
            var _a;
            showTooltip({
                tooltipTop: (_a = yScale(median(d))) !== null && _a !== void 0 ? _a : 0 + 40,
                tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                tooltipData: {
                    median: median(d),
                    name: x(d),
                },
            });
        },
        onMouseLeave: function () {
            hideTooltip();
        },
    }}/>
              </g>); })}
          </Group>
        </svg>

        {tooltipOpen && tooltipData && (<Tooltip top={tooltipTop} left={tooltipLeft} style={__assign(__assign({}, defaultTooltipStyles), { backgroundColor: '#283238', color: 'white' })}>
            <div>
              <strong>{tooltipData.name}</strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              {tooltipData.max && <div>max: {tooltipData.max}</div>}
              {tooltipData.thirdQuartile && <div>third quartile: {tooltipData.thirdQuartile}</div>}
              {tooltipData.median && <div>median: {tooltipData.median}</div>}
              {tooltipData.firstQuartile && <div>first quartile: {tooltipData.firstQuartile}</div>}
              {tooltipData.min && <div>min: {tooltipData.min}</div>}
            </div>
          </Tooltip>)}
      </div>);
});
