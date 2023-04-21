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
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { Brush } from '@visx/brush';
import { PatternLines } from '@visx/pattern';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { max, extent } from 'd3-array';
import AreaChart from './AreaChart';
// Initialize some variables
var stock = appleStock.slice(1000);
var brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
var chartSeparation = 30;
var PATTERN_ID = 'brush_pattern';
var GRADIENT_ID = 'brush_gradient';
export var accentColor = '#f6acc8';
export var background = '#584153';
export var background2 = '#af8baf';
var selectedBrushStyle = {
    fill: "url(#" + PATTERN_ID + ")",
    stroke: 'white',
};
// accessors
var getDate = function (d) { return new Date(d.date); };
var getStockValue = function (d) { return d.close; };
function BrushChart(_a) {
    var _b = _a.compact, compact = _b === void 0 ? false : _b, width = _a.width, height = _a.height, _c = _a.margin, margin = _c === void 0 ? {
        top: 20,
        left: 50,
        bottom: 20,
        right: 20,
    } : _c;
    var brushRef = useRef(null);
    var _d = useState(stock), filteredStock = _d[0], setFilteredStock = _d[1];
    var onBrushChange = function (domain) {
        if (!domain)
            return;
        var x0 = domain.x0, x1 = domain.x1, y0 = domain.y0, y1 = domain.y1;
        var stockCopy = stock.filter(function (s) {
            var x = getDate(s).getTime();
            var y = getStockValue(s);
            return x > x0 && x < x1 && y > y0 && y < y1;
        });
        setFilteredStock(stockCopy);
    };
    var innerHeight = height - margin.top - margin.bottom;
    var topChartBottomMargin = compact ? chartSeparation / 2 : chartSeparation + 10;
    var topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
    var bottomChartHeight = innerHeight - topChartHeight - chartSeparation;
    // bounds
    var xMax = Math.max(width - margin.left - margin.right, 0);
    var yMax = Math.max(topChartHeight, 0);
    var xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
    var yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);
    // scales
    var dateScale = useMemo(function () {
        return scaleTime({
            range: [0, xMax],
            domain: extent(filteredStock, getDate),
        });
    }, [xMax, filteredStock]);
    var stockScale = useMemo(function () {
        return scaleLinear({
            range: [yMax, 0],
            domain: [0, max(filteredStock, getStockValue) || 0],
            nice: true,
        });
    }, [yMax, filteredStock]);
    var brushDateScale = useMemo(function () {
        return scaleTime({
            range: [0, xBrushMax],
            domain: extent(stock, getDate),
        });
    }, [xBrushMax]);
    var brushStockScale = useMemo(function () {
        return scaleLinear({
            range: [yBrushMax, 0],
            domain: [0, max(stock, getStockValue) || 0],
            nice: true,
        });
    }, [yBrushMax]);
    var initialBrushPosition = useMemo(function () { return ({
        start: { x: brushDateScale(getDate(stock[50])) },
        end: { x: brushDateScale(getDate(stock[100])) },
    }); }, [brushDateScale]);
    // event handlers
    var handleClearClick = function () {
        if (brushRef === null || brushRef === void 0 ? void 0 : brushRef.current) {
            setFilteredStock(stock);
            brushRef.current.reset();
        }
    };
    var handleResetClick = function () {
        if (brushRef === null || brushRef === void 0 ? void 0 : brushRef.current) {
            var updater = function (prevBrush) {
                var newExtent = brushRef.current.getExtent(initialBrushPosition.start, initialBrushPosition.end);
                var newState = __assign(__assign({}, prevBrush), { start: { y: newExtent.y0, x: newExtent.x0 }, end: { y: newExtent.y1, x: newExtent.x1 }, extent: newExtent });
                return newState;
            };
            brushRef.current.updateBrush(updater);
        }
    };
    return (<div>
      <svg width={width} height={height}>
        <LinearGradient id={GRADIENT_ID} from={background} to={background2} rotate={45}/>
        <rect x={0} y={0} width={width} height={height} fill={"url(#" + GRADIENT_ID + ")"} rx={14}/>
        <AreaChart hideBottomAxis={compact} data={filteredStock} width={width} margin={__assign(__assign({}, margin), { bottom: topChartBottomMargin })} yMax={yMax} xScale={dateScale} yScale={stockScale} gradientColor={background2}/>
        <AreaChart hideBottomAxis hideLeftAxis data={stock} width={width} yMax={yBrushMax} xScale={brushDateScale} yScale={brushStockScale} margin={brushMargin} top={topChartHeight + topChartBottomMargin + margin.top} gradientColor={background2}>
          <PatternLines id={PATTERN_ID} height={8} width={8} stroke={accentColor} strokeWidth={1} orientation={['diagonal']}/>
          <Brush xScale={brushDateScale} yScale={brushStockScale} width={xBrushMax} height={yBrushMax} margin={brushMargin} handleSize={8} innerRef={brushRef} resizeTriggerAreas={['left', 'right']} brushDirection="horizontal" initialBrushPosition={initialBrushPosition} onChange={onBrushChange} onClick={function () { return setFilteredStock(stock); }} selectedBoxStyle={selectedBrushStyle} useWindowMoveEvents renderBrushHandle={function (props) { return <BrushHandle {...props}/>; }}/>
        </AreaChart>
      </svg>
      <button onClick={handleClearClick}>Clear</button>&nbsp;
      <button onClick={handleResetClick}>Reset</button>
    </div>);
}
// We need to manually offset the handles for them to be rendered at the right position
function BrushHandle(_a) {
    var x = _a.x, height = _a.height, isBrushActive = _a.isBrushActive;
    var pathWidth = 8;
    var pathHeight = 15;
    if (!isBrushActive) {
        return null;
    }
    return (<Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
      <path fill="#f2f2f2" d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12" stroke="#999999" strokeWidth="1" style={{ cursor: 'ew-resize' }}/>
    </Group>);
}
export default BrushChart;
