import React, { useState, useMemo } from 'react';
import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, coerceNumber } from '@visx/scale';
import { Axis, Orientation } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { AnimatedAxis, AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { getSeededRandom } from '@visx/mock-data';
import { LinearGradient } from '@visx/gradient';
import { timeFormat } from 'd3-time-format';
export var backgroundColor = '#da7cff';
var axisColor = '#fff';
var tickLabelColor = '#fff';
export var labelColor = '#340098';
var gridColor = '#6e0fca';
var seededRandom = getSeededRandom(0.5);
var margin = {
    top: 40,
    right: 150,
    bottom: 20,
    left: 50,
};
var tickLabelProps = {
    fill: tickLabelColor,
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'middle',
};
var getMinMax = function (vals) {
    var numericVals = vals.map(coerceNumber);
    return [Math.min.apply(Math, numericVals), Math.max.apply(Math, numericVals)];
};
export default function Example(_a) {
    var _b = _a.width, outerWidth = _b === void 0 ? 800 : _b, _c = _a.height, outerHeight = _c === void 0 ? 800 : _c, _d = _a.showControls, showControls = _d === void 0 ? true : _d;
    // use non-animated components if prefers-reduced-motion is set
    var prefersReducedMotionQuery = typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
    var prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;
    var _e = useState(!prefersReducedMotion), useAnimatedComponents = _e[0], setUseAnimatedComponents = _e[1];
    // in svg, margin is subtracted from total width/height
    var width = outerWidth - margin.left - margin.right;
    var height = outerHeight - margin.top - margin.bottom;
    var _f = useState(true), dataToggle = _f[0], setDataToggle = _f[1];
    var _g = useState('center'), animationTrajectory = _g[0], setAnimationTrajectory = _g[1];
    var AxisComponent = useAnimatedComponents ? AnimatedAxis : Axis;
    var GridRowsComponent = useAnimatedComponents
        ? AnimatedGridRows
        : GridRows;
    var GridColumnsComponent = useAnimatedComponents
        ? AnimatedGridColumns
        : GridColumns;
    var axes = useMemo(function () {
        // toggle between two value ranges to demo animation
        var linearValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
        var bandValues = dataToggle ? ['a', 'b', 'c', 'd'] : ['d', 'c', 'b', 'a'];
        var timeValues = dataToggle
            ? [new Date('2020-01-01'), new Date('2020-02-01')]
            : [new Date('2020-02-01'), new Date('2020-03-01')];
        var logValues = dataToggle ? [1, 10, 100, 1000, 10000] : [0.0001, 0.001, 0.1, 1, 10, 100];
        return [
            {
                scale: scaleLinear({
                    domain: getMinMax(linearValues),
                    range: [0, width],
                }),
                values: linearValues,
                tickFormat: function (v, index, ticks) {
                    return index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : "" + v;
                },
                label: 'linear',
            },
            {
                scale: scaleBand({
                    domain: bandValues,
                    range: [0, width],
                    paddingOuter: 0,
                    paddingInner: 1,
                }),
                values: bandValues,
                tickFormat: function (v) { return v; },
                label: 'categories',
            },
            {
                scale: scaleUtc({
                    domain: getMinMax(timeValues),
                    range: [0, width],
                }),
                values: timeValues,
                tickFormat: function (v, i) {
                    return i === 3 ? '🎉' : width > 400 || i % 2 === 0 ? timeFormat('%b %d')(v) : '';
                },
                label: 'time',
            },
            {
                scale: scaleLog({
                    domain: getMinMax(logValues),
                    range: [0, width],
                }),
                values: logValues,
                tickFormat: function (v) {
                    var asString = "" + v;
                    // label only major ticks
                    return asString.match(/^[.01?[\]]*$/) ? asString : '';
                },
                label: 'log',
            },
        ];
    }, [dataToggle, width]);
    if (width < 10)
        return null;
    var scalePadding = 40;
    var scaleHeight = height / axes.length - scalePadding;
    var yScale = scaleLinear({
        domain: [100, 0],
        range: [scaleHeight, 0],
    });
    return (<>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient id="visx-axis-gradient" from={backgroundColor} to={backgroundColor} toOpacity={0.5}/>
        <rect x={0} y={0} width={outerWidth} height={outerHeight} fill={'url(#visx-axis-gradient)'} rx={14}/>
        <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
          {axes.map(function (_a, i) {
        var scale = _a.scale, values = _a.values, label = _a.label, tickFormat = _a.tickFormat;
        return (<g key={"scale-" + i} transform={"translate(0, " + i * (scaleHeight + scalePadding) + ")"}>
              <GridRowsComponent 
        // force remount when this changes to see the animation difference
        key={"gridrows-" + animationTrajectory} scale={yScale} stroke={gridColor} width={width} numTicks={dataToggle ? 1 : 3} animationTrajectory={animationTrajectory}/>
              <GridColumnsComponent 
        // force remount when this changes to see the animation difference
        key={"gridcolumns-" + animationTrajectory} scale={scale} stroke={gridColor} height={scaleHeight} numTicks={dataToggle ? 5 : 2} animationTrajectory={animationTrajectory}/>
              <AreaClosed data={values.map(function (x) {
            var _a;
            return [
                ((_a = scale(x)) !== null && _a !== void 0 ? _a : 0) +
                    // offset point half of band width for band scales
                    ('bandwidth' in scale && typeof scale.bandwidth !== 'undefined'
                        ? scale.bandwidth() / 2
                        : 0),
                yScale(10 + seededRandom() * 90),
            ];
        })} yScale={yScale} curve={curveMonotoneX} fill={gridColor} fillOpacity={0.2}/>
              <AxisComponent 
        // force remount when this changes to see the animation difference
        key={"axis-" + animationTrajectory} orientation={Orientation.bottom} top={scaleHeight} scale={scale} tickFormat={tickFormat} stroke={axisColor} tickStroke={axisColor} tickLabelProps={tickLabelProps} tickValues={label === 'log' || label === 'time' ? undefined : values} numTicks={label === 'time' ? 6 : undefined} label={label} labelProps={{
            x: width + 30,
            y: -10,
            fill: labelColor,
            fontSize: 18,
            strokeWidth: 0,
            stroke: '#fff',
            paintOrder: 'stroke',
            fontFamily: 'sans-serif',
            textAnchor: 'start',
        }} animationTrajectory={animationTrajectory}/>
            </g>);
    })}
        </g>
      </svg>
      {showControls && (<>
          <div style={{ fontSize: 12 }}>
            <label>
              <input type="checkbox" onChange={function () { return setUseAnimatedComponents(!useAnimatedComponents); }} checked={useAnimatedComponents}/>{' '}
              enable animation
            </label>
            &nbsp;&nbsp;&nbsp;
            {useAnimatedComponents && (<>
                <strong>animation trajectory</strong>
                <label>
                  <input type="radio" onChange={function () { return setAnimationTrajectory('outside'); }} checked={animationTrajectory === 'outside'}/>{' '}
                  outside
                </label>
                <label>
                  <input type="radio" onChange={function () { return setAnimationTrajectory('center'); }} checked={animationTrajectory === 'center'}/>{' '}
                  center
                </label>
                <label>
                  <input type="radio" onChange={function () { return setAnimationTrajectory('min'); }} checked={animationTrajectory === 'min'}/>{' '}
                  min
                </label>
                <label>
                  <input type="radio" onChange={function () { return setAnimationTrajectory('max'); }} checked={animationTrajectory === 'max'}/>{' '}
                  max
                </label>
              </>)}
          </div>
          {useAnimatedComponents && (<button onClick={function () { return setDataToggle(!dataToggle); }}>Update scales</button>)}
        </>)}
    </>);
}
