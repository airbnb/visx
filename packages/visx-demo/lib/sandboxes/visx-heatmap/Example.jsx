import React from 'react';
import { Group } from '@visx/group';
import genBins from '@visx/mock-data/lib/generators/genBins';
import { scaleLinear } from '@visx/scale';
import { HeatmapCircle, HeatmapRect } from '@visx/heatmap';
import { getSeededRandom } from '@visx/mock-data';
var hot1 = '#77312f';
var hot2 = '#f33d15';
var cool1 = '#122549';
var cool2 = '#b4fbde';
export var background = '#28272c';
var seededRandom = getSeededRandom(0.41);
var binData = genBins(
/* length = */ 16, 
/* height = */ 16, 
/** binFunc */ function (idx) { return 150 * idx; }, 
/** countFunc */ function (i, number) { return 25 * (number - i) * seededRandom(); });
function max(data, value) {
    return Math.max.apply(Math, data.map(value));
}
function min(data, value) {
    return Math.min.apply(Math, data.map(value));
}
// accessors
var bins = function (d) { return d.bins; };
var count = function (d) { return d.count; };
var colorMax = max(binData, function (d) { return max(bins(d), count); });
var bucketSizeMax = max(binData, function (d) { return bins(d).length; });
// scales
var xScale = scaleLinear({
    domain: [0, binData.length],
});
var yScale = scaleLinear({
    domain: [0, bucketSizeMax],
});
var circleColorScale = scaleLinear({
    range: [hot1, hot2],
    domain: [0, colorMax],
});
var rectColorScale = scaleLinear({
    range: [cool1, cool2],
    domain: [0, colorMax],
});
var opacityScale = scaleLinear({
    range: [0.1, 1],
    domain: [0, colorMax],
});
var defaultMargin = { top: 10, left: 20, right: 20, bottom: 110 };
function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b, _c = _a.margin, margin = _c === void 0 ? defaultMargin : _c, _d = _a.separation, separation = _d === void 0 ? 20 : _d;
    // bounds
    var size = width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
    var xMax = size / 2;
    var yMax = height - margin.bottom - margin.top;
    var binWidth = xMax / binData.length;
    var binHeight = yMax / bucketSizeMax;
    var radius = min([binWidth, binHeight], function (d) { return d; }) / 2;
    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={background}/>
      <Group top={margin.top} left={margin.left}>
        <HeatmapCircle data={binData} xScale={function (d) { var _a; return (_a = xScale(d)) !== null && _a !== void 0 ? _a : 0; }} yScale={function (d) { var _a; return (_a = yScale(d)) !== null && _a !== void 0 ? _a : 0; }} colorScale={circleColorScale} opacityScale={opacityScale} radius={radius} gap={2}>
          {function (heatmap) {
        return heatmap.map(function (heatmapBins) {
            return heatmapBins.map(function (bin) { return (<circle key={"heatmap-circle-" + bin.row + "-" + bin.column} className="visx-heatmap-circle" cx={bin.cx} cy={bin.cy} r={bin.r} fill={bin.color} fillOpacity={bin.opacity} onClick={function () {
                if (!events)
                    return;
                var row = bin.row, column = bin.column;
                alert(JSON.stringify({ row: row, column: column, bin: bin.bin }));
            }}/>); });
        });
    }}
        </HeatmapCircle>
      </Group>
      <Group top={margin.top} left={xMax + margin.left + separation}>
        <HeatmapRect data={binData} xScale={function (d) { var _a; return (_a = xScale(d)) !== null && _a !== void 0 ? _a : 0; }} yScale={function (d) { var _a; return (_a = yScale(d)) !== null && _a !== void 0 ? _a : 0; }} colorScale={rectColorScale} opacityScale={opacityScale} binWidth={binWidth} binHeight={binWidth} gap={2}>
          {function (heatmap) {
        return heatmap.map(function (heatmapBins) {
            return heatmapBins.map(function (bin) { return (<rect key={"heatmap-rect-" + bin.row + "-" + bin.column} className="visx-heatmap-rect" width={bin.width} height={bin.height} x={bin.x} y={bin.y} fill={bin.color} fillOpacity={bin.opacity} onClick={function () {
                if (!events)
                    return;
                var row = bin.row, column = bin.column;
                alert(JSON.stringify({ row: row, column: column, bin: bin.bin }));
            }}/>); });
        });
    }}
        </HeatmapRect>
      </Group>
    </svg>);
}
export default Example;
