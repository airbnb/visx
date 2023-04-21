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
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from '@visx/xychart';
import { PatternLines } from '@visx/pattern';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import customTheme from './customTheme';
import userPrefersReducedMotion from './userPrefersReducedMotion';
import getAnimatedOrUnanimatedComponents from './getAnimatedOrUnanimatedComponents';
var dateScaleConfig = { type: 'band', paddingInner: 0.3 };
var temperatureScaleConfig = { type: 'linear' };
var numTicks = 4;
var data = cityTemperature.slice(225, 275);
var dataMissingValues = data.map(function (d, i) {
    return i === 10 || i === 11
        ? __assign(__assign({}, d), { 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }) : d;
});
var dataSmall = data.slice(0, 15);
var dataSmallMissingValues = dataMissingValues.slice(0, 15);
var getDate = function (d) { return d.date; };
var getSfTemperature = function (d) { return Number(d['San Francisco']); };
var getNegativeSfTemperature = function (d) { return -getSfTemperature(d); };
var getNyTemperature = function (d) { return Number(d['New York']); };
var getAustinTemperature = function (d) { return Number(d.Austin); };
var defaultAnnotationDataIndex = 13;
var selectedDatumPatternId = 'xychart-selected-datum';
export default function ExampleControls(_a) {
    var children = _a.children;
    var _b = useState(!userPrefersReducedMotion()), useAnimatedComponents = _b[0], setUseAnimatedComponents = _b[1];
    var _c = useState(darkTheme), theme = _c[0], setTheme = _c[1];
    var _d = useState('center'), animationTrajectory = _d[0], setAnimationTrajectory = _d[1];
    var _e = useState([false, false]), gridProps = _e[0], setGridProps = _e[1];
    var showGridRows = gridProps[0], showGridColumns = gridProps[1];
    var _f = useState('bottom'), xAxisOrientation = _f[0], setXAxisOrientation = _f[1];
    var _g = useState('right'), yAxisOrientation = _g[0], setYAxisOrientation = _g[1];
    var _h = useState(false), renderHorizontally = _h[0], setRenderHorizontally = _h[1];
    var _j = useState(true), showTooltip = _j[0], setShowTooltip = _j[1];
    var _k = useState(null), annotationDataKey = _k[0], setAnnotationDataKey = _k[1];
    var _l = useState('circle'), annotationType = _l[0], setAnnotationType = _l[1];
    var _m = useState(true), showVerticalCrosshair = _m[0], setShowVerticalCrosshair = _m[1];
    var _o = useState(false), showHorizontalCrosshair = _o[0], setShowHorizontalCrosshair = _o[1];
    var _p = useState(true), snapTooltipToDatumX = _p[0], setSnapTooltipToDatumX = _p[1];
    var _q = useState(true), snapTooltipToDatumY = _q[0], setSnapTooltipToDatumY = _q[1];
    var _r = useState(true), sharedTooltip = _r[0], setSharedTooltip = _r[1];
    var _s = useState('none'), renderBarStackOrGroup = _s[0], setRenderBarStackOrGroup = _s[1];
    var _t = useState('areastack'), renderAreaLineOrStack = _t[0], setRenderAreaLineOrStack = _t[1];
    var _u = useState(), stackOffset = _u[0], setStackOffset = _u[1];
    var _v = useState(false), renderGlyphSeries = _v[0], setRenderGlyphSeries = _v[1];
    var _w = useState(false), editAnnotationLabelPosition = _w[0], setEditAnnotationLabelPosition = _w[1];
    var _x = useState({ dx: -40, dy: -20 }), annotationLabelPosition = _x[0], setAnnotationLabelPosition = _x[1];
    var _y = useState(defaultAnnotationDataIndex), annotationDataIndex = _y[0], setAnnotationDataIndex = _y[1];
    var _z = useState(false), negativeValues = _z[0], setNegativeValues = _z[1];
    var _0 = useState(false), fewerDatum = _0[0], setFewerDatum = _0[1];
    var _1 = useState(false), missingValues = _1[0], setMissingValues = _1[1];
    var _2 = useState('star'), glyphComponent = _2[0], setGlyphComponent = _2[1];
    var _3 = useState('linear'), curveType = _3[0], setCurveType = _3[1];
    var glyphOutline = theme.gridStyles.stroke;
    var renderGlyph = useCallback(function (_a) {
        var size = _a.size, color = _a.color, onPointerMove = _a.onPointerMove, onPointerOut = _a.onPointerOut, onPointerUp = _a.onPointerUp;
        var handlers = { onPointerMove: onPointerMove, onPointerOut: onPointerOut, onPointerUp: onPointerUp };
        if (glyphComponent === 'star') {
            return <GlyphStar stroke={glyphOutline} fill={color} size={size * 10} {...handlers}/>;
        }
        if (glyphComponent === 'circle') {
            return <GlyphDot stroke={glyphOutline} fill={color} r={size / 2} {...handlers}/>;
        }
        if (glyphComponent === 'cross') {
            return <GlyphCross stroke={glyphOutline} fill={color} size={size * 10} {...handlers}/>;
        }
        return (<text dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
        </text>);
    }, [glyphComponent, glyphOutline]);
    var _4 = useState(false), enableTooltipGlyph = _4[0], setEnableTooltipGlyph = _4[1];
    var _5 = useState('star'), tooltipGlyphComponent = _5[0], setTooltipGlyphComponent = _5[1];
    var renderTooltipGlyph = useCallback(function (_a) {
        var x = _a.x, y = _a.y, size = _a.size, color = _a.color, onPointerMove = _a.onPointerMove, onPointerOut = _a.onPointerOut, onPointerUp = _a.onPointerUp, isNearestDatum = _a.isNearestDatum;
        var handlers = { onPointerMove: onPointerMove, onPointerOut: onPointerOut, onPointerUp: onPointerUp };
        if (tooltipGlyphComponent === 'star') {
            return (<GlyphStar left={x} top={y} stroke={glyphOutline} fill={color} size={size * 10} {...handlers}/>);
        }
        if (tooltipGlyphComponent === 'circle') {
            return (<GlyphDot left={x} top={y} stroke={glyphOutline} fill={color} r={size} {...handlers}/>);
        }
        if (tooltipGlyphComponent === 'cross') {
            return (<GlyphCross left={x} top={y} stroke={glyphOutline} fill={color} size={size * 10} {...handlers}/>);
        }
        return (<text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          {isNearestDatum ? '🍍' : '🍌'}
        </text>);
    }, [tooltipGlyphComponent, glyphOutline]);
    // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
    var colorAccessorFactory = useCallback(function (dataKey) { return function (d) {
        return annotationDataKey === dataKey && d === data[annotationDataIndex]
            ? "url(#" + selectedDatumPatternId + ")"
            : null;
    }; }, [annotationDataIndex, annotationDataKey]);
    var accessors = useMemo(function () { return ({
        x: {
            'San Francisco': renderHorizontally
                ? negativeValues
                    ? getNegativeSfTemperature
                    : getSfTemperature
                : getDate,
            'New York': renderHorizontally ? getNyTemperature : getDate,
            Austin: renderHorizontally ? getAustinTemperature : getDate,
        },
        y: {
            'San Francisco': renderHorizontally
                ? getDate
                : negativeValues
                    ? getNegativeSfTemperature
                    : getSfTemperature,
            'New York': renderHorizontally ? getDate : getNyTemperature,
            Austin: renderHorizontally ? getDate : getAustinTemperature,
        },
        date: getDate,
    }); }, [renderHorizontally, negativeValues]);
    var config = useMemo(function () { return ({
        x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
        y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }); }, [renderHorizontally]);
    // cannot snap to a stack position
    var canSnapTooltipToDatum = renderBarStackOrGroup !== 'barstack' && renderAreaLineOrStack !== 'areastack';
    return (<>
      {children(__assign({ accessors: accessors,
        animationTrajectory: animationTrajectory,
        annotationDataKey: annotationDataKey, annotationDatum: data[annotationDataIndex], annotationLabelPosition: annotationLabelPosition,
        annotationType: annotationType,
        colorAccessorFactory: colorAccessorFactory,
        config: config, curve: (curveType === 'cardinal' && curveCardinal) ||
            (curveType === 'step' && curveStep) ||
            curveLinear, data: fewerDatum
            ? missingValues
                ? dataSmallMissingValues
                : dataSmall
            : missingValues
                ? dataMissingValues
                : data, editAnnotationLabelPosition: editAnnotationLabelPosition,
        numTicks: numTicks, renderBarGroup: renderBarStackOrGroup === 'bargroup', renderBarSeries: renderBarStackOrGroup === 'bar', renderBarStack: renderBarStackOrGroup === 'barstack', renderGlyphSeries: renderGlyphSeries,
        renderGlyph: renderGlyph,
        enableTooltipGlyph: enableTooltipGlyph,
        renderTooltipGlyph: renderTooltipGlyph,
        renderHorizontally: renderHorizontally, renderAreaSeries: renderAreaLineOrStack === 'area', renderAreaStack: renderAreaLineOrStack === 'areastack', renderLineSeries: renderAreaLineOrStack === 'line', setAnnotationDataIndex: setAnnotationDataIndex,
        setAnnotationDataKey: setAnnotationDataKey,
        setAnnotationLabelPosition: setAnnotationLabelPosition,
        sharedTooltip: sharedTooltip,
        showGridColumns: showGridColumns,
        showGridRows: showGridRows,
        showHorizontalCrosshair: showHorizontalCrosshair,
        showTooltip: showTooltip,
        showVerticalCrosshair: showVerticalCrosshair, snapTooltipToDatumX: canSnapTooltipToDatum && snapTooltipToDatumX, snapTooltipToDatumY: canSnapTooltipToDatum && snapTooltipToDatumY, stackOffset: stackOffset,
        theme: theme,
        xAxisOrientation: xAxisOrientation,
        yAxisOrientation: yAxisOrientation }, getAnimatedOrUnanimatedComponents(useAnimatedComponents)))}
      
      <svg className="pattern-lines">
        <PatternLines id={selectedDatumPatternId} width={6} height={6} orientation={['diagonalRightToLeft']} stroke={theme === null || theme === void 0 ? void 0 : theme.axisStyles.x.bottom.axisLine.stroke} strokeWidth={1.5}/>
      </svg>
      <div className="controls">
        
        <div>
          <strong>data</strong>
          <label>
            <input type="checkbox" onChange={function () { return setNegativeValues(!negativeValues); }} checked={negativeValues}/>
            negative values (SF)
          </label>
          <label>
            <input type="checkbox" onChange={function () { return setMissingValues(!missingValues); }} checked={missingValues}/>
            missing values
          </label>
          <label>
            <input type="checkbox" onChange={function () { return setFewerDatum(!fewerDatum); }} checked={fewerDatum}/>
            fewer datum
          </label>
        </div>

        
        <div>
          <strong>theme</strong>
          <label>
            <input type="radio" onChange={function () { return setTheme(lightTheme); }} checked={theme === lightTheme}/>
            light
          </label>
          <label>
            <input type="radio" onChange={function () { return setTheme(darkTheme); }} checked={theme === darkTheme}/>
            dark
          </label>
          <label>
            <input type="radio" onChange={function () { return setTheme(customTheme); }} checked={theme === customTheme}/>
            custom
          </label>
        </div>

        <br />

        
        
        <div>
          <strong>series orientation</strong>
          <label>
            <input type="radio" onChange={function () { return setRenderHorizontally(false); }} checked={!renderHorizontally}/>
            vertical
          </label>
          <label>
            <input type="radio" onChange={function () { return setRenderHorizontally(true); }} checked={renderHorizontally}/>
            horizontal
          </label>
        </div>
        <div>
          <strong>line series</strong>
          <label>
            <input type="radio" onChange={function () {
        if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
            setRenderBarStackOrGroup('none');
        }
        setRenderAreaLineOrStack('line');
    }} checked={renderAreaLineOrStack === 'line'}/>
            line
          </label>
          <label>
            <input type="radio" onChange={function () {
        if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
            setRenderBarStackOrGroup('none');
        }
        setRenderAreaLineOrStack('area');
    }} checked={renderAreaLineOrStack === 'area'}/>
            area
          </label>
          <label>
            <input type="radio" onChange={function () {
        setRenderBarStackOrGroup('none');
        setRenderAreaLineOrStack('areastack');
    }} checked={renderAreaLineOrStack === 'areastack'}/>
            area stack
          </label>
          <label>
            <input type="radio" onChange={function () { return setRenderAreaLineOrStack('none'); }} checked={renderAreaLineOrStack === 'none'}/>
            none
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>curve shape</strong>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack === 'none'} onChange={function () { return setCurveType('linear'); }} checked={curveType === 'linear'}/>
            linear
          </label>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack === 'none'} onChange={function () { return setCurveType('cardinal'); }} checked={curveType === 'cardinal'}/>
            cardinal (smooth)
          </label>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack === 'none'} onChange={function () { return setCurveType('step'); }} checked={curveType === 'step'}/>
            step
          </label>
        </div>
        
        <div>
          <strong>glyph series</strong>
          <label>
            <input type="checkbox" onChange={function () { return setRenderGlyphSeries(!renderGlyphSeries); }} checked={renderGlyphSeries}/>
            render glyphs
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" disabled={!renderGlyphSeries} onChange={function () { return setGlyphComponent('circle'); }} checked={glyphComponent === 'circle'}/>
            circle
          </label>
          <label>
            <input type="radio" disabled={!renderGlyphSeries} onChange={function () { return setGlyphComponent('star'); }} checked={glyphComponent === 'star'}/>
            star
          </label>
          <label>
            <input type="radio" disabled={!renderGlyphSeries} onChange={function () { return setGlyphComponent('cross'); }} checked={glyphComponent === 'cross'}/>
            cross
          </label>
          <label>
            <input type="radio" disabled={!renderGlyphSeries} onChange={function () { return setGlyphComponent('🍍'); }} checked={glyphComponent === '🍍'}/>
            🍍
          </label>
        </div>
        <div>
          <strong>bar series</strong>
          <label>
            <input type="radio" onChange={function () {
        if (renderAreaLineOrStack === 'areastack') {
            setRenderAreaLineOrStack('none');
        }
        setRenderBarStackOrGroup('bar');
    }} checked={renderBarStackOrGroup === 'bar'}/>
            bar
          </label>
          <label>
            <input type="radio" onChange={function () {
        setRenderAreaLineOrStack('none');
        setRenderBarStackOrGroup('barstack');
    }} checked={renderBarStackOrGroup === 'barstack'}/>
            bar stack
          </label>
          <label>
            <input type="radio" onChange={function () {
        setRenderAreaLineOrStack('none');
        setRenderBarStackOrGroup('bargroup');
    }} checked={renderBarStackOrGroup === 'bargroup'}/>
            bar group
          </label>
          <label>
            <input type="radio" onChange={function () { return setRenderBarStackOrGroup('none'); }} checked={renderBarStackOrGroup === 'none'}/>
            none
          </label>
        </div>
        <div>
          <strong>stack series offset</strong>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'} onChange={function () { return setStackOffset(undefined); }} checked={stackOffset == null}/>
            auto (zero-baseline)
          </label>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'} onChange={function () { return setStackOffset('expand'); }} checked={stackOffset === 'expand'}/>
            expand (values sum to 1)
          </label>
          <label>
            <input type="radio" disabled={renderAreaLineOrStack !== 'areastack' && renderBarStackOrGroup !== 'barstack'} onChange={function () { return setStackOffset('wiggle'); }} checked={stackOffset === 'wiggle'}/>
            wiggle (stream graph)
          </label>
        </div>

        <br />
        
        <div>
          <strong>tooltip</strong>
          <label>
            <input type="checkbox" onChange={function () { return setShowTooltip(!showTooltip); }} checked={showTooltip}/>
            show tooltip
          </label>
          <label>
            <input type="checkbox" disabled={!showTooltip || !canSnapTooltipToDatum} onChange={function () { return setSnapTooltipToDatumX(!snapTooltipToDatumX); }} checked={showTooltip && snapTooltipToDatumX}/>
            snap tooltip to datum x
          </label>
          <label>
            <input type="checkbox" disabled={!showTooltip || !canSnapTooltipToDatum} onChange={function () { return setSnapTooltipToDatumY(!snapTooltipToDatumY); }} checked={showTooltip && snapTooltipToDatumY}/>
            snap tooltip to datum y
          </label>
          <label>
            <input type="checkbox" disabled={!showTooltip} onChange={function () { return setShowVerticalCrosshair(!showVerticalCrosshair); }} checked={showTooltip && showVerticalCrosshair}/>
            vertical crosshair
          </label>
          <label>
            <input type="checkbox" disabled={!showTooltip} onChange={function () { return setShowHorizontalCrosshair(!showHorizontalCrosshair); }} checked={showTooltip && showHorizontalCrosshair}/>
            horizontal crosshair
          </label>
          <label>
            <input type="checkbox" disabled={!showTooltip} onChange={function () { return setSharedTooltip(!sharedTooltip); }} checked={showTooltip && sharedTooltip}/>
            shared tooltip
          </label>
        </div>
        <div>
          <strong>tooltip gliph</strong>
          <label>
            <input type="checkbox" onChange={function () { return setEnableTooltipGlyph(!enableTooltipGlyph); }} disabled={!canSnapTooltipToDatum} checked={enableTooltipGlyph}/>
            show custom tooltip gliph
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" disabled={!enableTooltipGlyph || !canSnapTooltipToDatum} onChange={function () { return setTooltipGlyphComponent('circle'); }} checked={tooltipGlyphComponent === 'circle'}/>
            circle
          </label>
          <label>
            <input type="radio" disabled={!enableTooltipGlyph || !canSnapTooltipToDatum} onChange={function () { return setTooltipGlyphComponent('star'); }} checked={tooltipGlyphComponent === 'star'}/>
            star
          </label>
          <label>
            <input type="radio" disabled={!enableTooltipGlyph || !canSnapTooltipToDatum} onChange={function () { return setTooltipGlyphComponent('cross'); }} checked={tooltipGlyphComponent === 'cross'}/>
            cross
          </label>
          <label>
            <input type="radio" disabled={!enableTooltipGlyph || !canSnapTooltipToDatum} onChange={function () { return setTooltipGlyphComponent('🍍'); }} checked={tooltipGlyphComponent === '🍍'}/>
            🍍
          </label>
        </div>
        
        <div>
          <strong>annotation</strong> (click chart to update)
          <label>
            <input type="radio" onChange={function () { return setAnnotationDataKey(null); }} checked={annotationDataKey == null}/>
            none
          </label>
          <label>
            <input type="radio" onChange={function () { return setAnnotationDataKey('San Francisco'); }} checked={annotationDataKey === 'San Francisco'}/>
            SF
          </label>
          <label>
            <input type="radio" onChange={function () { return setAnnotationDataKey('New York'); }} checked={annotationDataKey === 'New York'}/>
            NY
          </label>
          <label>
            <input type="radio" onChange={function () { return setAnnotationDataKey('Austin'); }} checked={annotationDataKey === 'Austin'}/>
            Austin
          </label>
          &nbsp;&nbsp;&nbsp;
          <strong>type</strong>
          <label>
            <input type="radio" onChange={function () { return setAnnotationType('circle'); }} checked={annotationType === 'circle'}/>
            circle
          </label>
          <label>
            <input type="radio" onChange={function () { return setAnnotationType('line'); }} checked={annotationType === 'line'}/>
            line
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input type="checkbox" onChange={function () { return setEditAnnotationLabelPosition(!editAnnotationLabelPosition); }} checked={editAnnotationLabelPosition}/>
            edit label position
          </label>
        </div>

        <br />

        
        <div>
          <strong>axes</strong>
          <label>
            <input type="radio" onChange={function () { return setXAxisOrientation('bottom'); }} checked={xAxisOrientation === 'bottom'}/>
            bottom
          </label>
          <label>
            <input type="radio" onChange={function () { return setXAxisOrientation('top'); }} checked={xAxisOrientation === 'top'}/>
            top
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" onChange={function () { return setYAxisOrientation('left'); }} checked={yAxisOrientation === 'left'}/>
            left
          </label>
          <label>
            <input type="radio" onChange={function () { return setYAxisOrientation('right'); }} checked={yAxisOrientation === 'right'}/>
            right
          </label>
        </div>

        
        <div>
          <strong>grid</strong>
          <label>
            <input type="radio" onChange={function () { return setGridProps([true, false]); }} checked={showGridRows && !showGridColumns}/>
            rows
          </label>
          <label>
            <input type="radio" onChange={function () { return setGridProps([false, true]); }} checked={!showGridRows && showGridColumns}/>
            columns
          </label>
          <label>
            <input type="radio" onChange={function () { return setGridProps([true, true]); }} checked={showGridRows && showGridColumns}/>
            both
          </label>
          <label>
            <input type="radio" onChange={function () { return setGridProps([false, false]); }} checked={!showGridRows && !showGridColumns}/>
            none
          </label>
        </div>
        
        <div>
          <label>
            <input type="checkbox" onChange={function () { return setUseAnimatedComponents(!useAnimatedComponents); }} checked={useAnimatedComponents}/>
            use animated components
          </label>

          {useAnimatedComponents && (<>
              &nbsp;&nbsp;&nbsp;
              <strong>axis + grid animation</strong>
              <label>
                <input type="radio" onChange={function () { return setAnimationTrajectory('center'); }} checked={animationTrajectory === 'center'}/>
                from center
              </label>
              <label>
                <input type="radio" onChange={function () { return setAnimationTrajectory('outside'); }} checked={animationTrajectory === 'outside'}/>
                from outside
              </label>
              <label>
                <input type="radio" onChange={function () { return setAnimationTrajectory('min'); }} checked={animationTrajectory === 'min'}/>
                from min
              </label>
              <label>
                <input type="radio" onChange={function () { return setAnimationTrajectory('max'); }} checked={animationTrajectory === 'max'}/>
                from max
              </label>
            </>)}
        </div>
      </div>
      <style jsx>{"\n        .controls {\n          font-size: 13px;\n          line-height: 1.5em;\n        }\n        .controls > div {\n          margin-bottom: 4px;\n        }\n        label {\n          font-size: 12px;\n        }\n        input[type='radio'] {\n          height: 10px;\n        }\n        .pattern-lines {\n          position: absolute;\n          pointer-events: none;\n          opacity: 0;\n        }\n      "}</style>
    </>);
}
