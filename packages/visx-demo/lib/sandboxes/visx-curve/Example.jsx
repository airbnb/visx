import React, { useState } from 'react';
import { extent, max } from 'd3-array';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker';
import generateDateValue from '@visx/mock-data/lib/generators/genDateValue';
var curveTypes = Object.keys(allCurves);
var lineCount = 5;
var series = new Array(lineCount).fill(null).map(function (_, i) {
    // vary each series value deterministically
    return generateDateValue(25, /* seed= */ i / 72).sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
});
var allData = series.reduce(function (rec, d) { return rec.concat(d); }, []);
// data accessors
var getX = function (d) { return d.date; };
var getY = function (d) { return d.value; };
// scales
var xScale = scaleTime({
    domain: extent(allData, getX),
});
var yScale = scaleLinear({
    domain: [0, max(allData, getY)],
});
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.showControls, showControls = _b === void 0 ? true : _b;
    var _c = useState('curveNatural'), curveType = _c[0], setCurveType = _c[1];
    var _d = useState(true), showPoints = _d[0], setShowPoints = _d[1];
    var svgHeight = showControls ? height - 40 : height;
    var lineHeight = svgHeight / lineCount;
    // update scale output ranges
    xScale.range([0, width - 50]);
    yScale.range([lineHeight - 2, 0]);
    return (<div className="visx-curves-demo">
      {showControls && (<>
          <label>
            Curve type &nbsp;
            <select onChange={function (e) { return setCurveType(e.target.value); }} value={curveType}>
              {curveTypes.map(function (curve) { return (<option key={curve} value={curve}>
                  {curve}
                </option>); })}
            </select>
          </label>
          &nbsp;
          <label>
            Show points&nbsp;
            <input type="checkbox" checked={showPoints} onChange={function () { return setShowPoints(!showPoints); }}/>
          </label>
          <br />
        </>)}
      <svg width={width} height={svgHeight}>
        <MarkerX id="marker-x" stroke="#333" size={22} strokeWidth={4} markerUnits="userSpaceOnUse"/>
        <MarkerCross id="marker-cross" stroke="#333" size={22} strokeWidth={4} strokeOpacity={0.6} markerUnits="userSpaceOnUse"/>
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2}/>
        <MarkerArrow id="marker-arrow-odd" stroke="#333" size={8} strokeWidth={1}/>
        <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1}/>
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6}/>
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14}/>
        {width > 8 &&
        series.map(function (lineData, i) {
            var even = i % 2 === 0;
            var markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
            if (i === 1)
                markerStart = 'url(#marker-line)';
            var markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
            return (<Group key={"lines-" + i} top={i * lineHeight} left={13}>
                {showPoints &&
                lineData.map(function (d, j) { return (<circle key={i + j} r={3} cx={xScale(getX(d))} cy={yScale(getY(d))} stroke="rgba(33,33,33,0.5)" fill="transparent"/>); })}
                <LinePath curve={allCurves[curveType]} data={lineData} x={function (d) { var _a; return (_a = xScale(getX(d))) !== null && _a !== void 0 ? _a : 0; }} y={function (d) { var _a; return (_a = yScale(getY(d))) !== null && _a !== void 0 ? _a : 0; }} stroke="#333" strokeWidth={even ? 2 : 1} strokeOpacity={even ? 0.6 : 1} shapeRendering="geometricPrecision" markerMid="url(#marker-circle)" markerStart={markerStart} markerEnd={markerEnd}/>
              </Group>);
        })}
      </svg>
      <style jsx>{"\n        .visx-curves-demo label {\n          font-size: 12px;\n        }\n      "}</style>
    </div>);
}
