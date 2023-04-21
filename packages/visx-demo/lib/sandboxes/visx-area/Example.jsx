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
import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
var stock = appleStock.slice(800);
export var background = '#3b6978';
export var background2 = '#204051';
export var accentColor = '#edffea';
export var accentColorDark = '#75daad';
var tooltipStyles = __assign(__assign({}, defaultStyles), { background: background, border: '1px solid white', color: 'white' });
// util
var formatDate = timeFormat("%b %d, '%y");
// accessors
var getDate = function (d) { return new Date(d.date); };
var getStockValue = function (d) { return d.close; };
var bisectDate = bisector(function (d) { return new Date(d.date); }).left;
export default withTooltip(function (_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? { top: 0, right: 0, bottom: 0, left: 0 } : _b, showTooltip = _a.showTooltip, hideTooltip = _a.hideTooltip, tooltipData = _a.tooltipData, _c = _a.tooltipTop, tooltipTop = _c === void 0 ? 0 : _c, _d = _a.tooltipLeft, tooltipLeft = _d === void 0 ? 0 : _d;
    if (width < 10)
        return null;
    // bounds
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    // scales
    var dateScale = useMemo(function () {
        return scaleTime({
            range: [margin.left, innerWidth + margin.left],
            domain: extent(stock, getDate),
        });
    }, [innerWidth, margin.left]);
    var stockValueScale = useMemo(function () {
        return scaleLinear({
            range: [innerHeight + margin.top, margin.top],
            domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
            nice: true,
        });
    }, [margin.top, innerHeight]);
    // tooltip handler
    var handleTooltip = useCallback(function (event) {
        var x = (localPoint(event) || { x: 0 }).x;
        var x0 = dateScale.invert(x);
        var index = bisectDate(stock, x0, 1);
        var d0 = stock[index - 1];
        var d1 = stock[index];
        var d = d0;
        if (d1 && getDate(d1)) {
            d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: stockValueScale(getStockValue(d)),
        });
    }, [showTooltip, stockValueScale, dateScale]);
    return (<div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="url(#area-background-gradient)" rx={14}/>
          <LinearGradient id="area-background-gradient" from={background} to={background2}/>
          <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1}/>
          <GridRows left={margin.left} scale={stockValueScale} width={innerWidth} strokeDasharray="1,3" stroke={accentColor} strokeOpacity={0} pointerEvents="none"/>
          <GridColumns top={margin.top} scale={dateScale} height={innerHeight} strokeDasharray="1,3" stroke={accentColor} strokeOpacity={0.2} pointerEvents="none"/>
          <AreaClosed data={stock} x={function (d) { var _a; return (_a = dateScale(getDate(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = stockValueScale(getStockValue(d))) !== null && _a !== void 0 ? _a : 0; }} yScale={stockValueScale} strokeWidth={1} stroke="url(#area-gradient)" fill="url(#area-gradient)" curve={curveMonotoneX}/>
          <Bar x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} fill="transparent" rx={14} onTouchStart={handleTooltip} onTouchMove={handleTooltip} onMouseMove={handleTooltip} onMouseLeave={function () { return hideTooltip(); }}/>
          {tooltipData && (<g>
              <Line from={{ x: tooltipLeft, y: margin.top }} to={{ x: tooltipLeft, y: innerHeight + margin.top }} stroke={accentColorDark} strokeWidth={2} pointerEvents="none" strokeDasharray="5,2"/>
              <circle cx={tooltipLeft} cy={tooltipTop + 1} r={4} fill="black" fillOpacity={0.1} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none"/>
              <circle cx={tooltipLeft} cy={tooltipTop} r={4} fill={accentColorDark} stroke="white" strokeWidth={2} pointerEvents="none"/>
            </g>)}
        </svg>
        {tooltipData && (<div>
            <TooltipWithBounds key={Math.random()} top={tooltipTop - 12} left={tooltipLeft + 12} style={tooltipStyles}>
              {"$" + getStockValue(tooltipData)}
            </TooltipWithBounds>
            <Tooltip top={innerHeight + margin.top - 14} left={tooltipLeft} style={__assign(__assign({}, defaultStyles), { minWidth: 72, textAlign: 'center', transform: 'translateX(-50%)' })}>
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>)}
      </div>);
});
