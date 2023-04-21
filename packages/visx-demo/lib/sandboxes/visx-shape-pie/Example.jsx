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
import React, { useState } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import browserUsage from '@visx/mock-data/lib/mocks/browserUsage';
import { animated, useTransition, interpolate } from '@react-spring/web';
var letters = letterFrequency.slice(0, 4);
var browserNames = Object.keys(browserUsage[0]).filter(function (k) { return k !== 'date'; });
var browsers = browserNames.map(function (name) { return ({
    label: name,
    usage: Number(browserUsage[0][name]),
}); });
// accessor functions
var usage = function (d) { return d.usage; };
var frequency = function (d) { return d.frequency; };
// color scales
var getBrowserColor = scaleOrdinal({
    domain: browserNames,
    range: [
        'rgba(255,255,255,0.7)',
        'rgba(255,255,255,0.6)',
        'rgba(255,255,255,0.5)',
        'rgba(255,255,255,0.4)',
        'rgba(255,255,255,0.3)',
        'rgba(255,255,255,0.2)',
        'rgba(255,255,255,0.1)',
    ],
});
var getLetterFrequencyColor = scaleOrdinal({
    domain: letters.map(function (l) { return l.letter; }),
    range: ['rgba(93,30,91,1)', 'rgba(93,30,91,0.8)', 'rgba(93,30,91,0.6)', 'rgba(93,30,91,0.4)'],
});
var defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b, _c = _a.animate, animate = _c === void 0 ? true : _c;
    var _d = useState(null), selectedBrowser = _d[0], setSelectedBrowser = _d[1];
    var _e = useState(null), selectedAlphabetLetter = _e[0], setSelectedAlphabetLetter = _e[1];
    if (width < 10)
        return null;
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    var radius = Math.min(innerWidth, innerHeight) / 2;
    var centerY = innerHeight / 2;
    var centerX = innerWidth / 2;
    var donutThickness = 50;
    return (<svg width={width} height={height}>
      <GradientPinkBlue id="visx-pie-gradient"/>
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')"/>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie data={selectedBrowser ? browsers.filter(function (_a) {
        var label = _a.label;
        return label === selectedBrowser;
    }) : browsers} pieValue={usage} outerRadius={radius} innerRadius={radius - donutThickness} cornerRadius={3} padAngle={0.005}>
          {function (pie) { return (<AnimatedPie {...pie} animate={animate} getKey={function (arc) { return arc.data.label; }} onClickDatum={function (_a) {
        var label = _a.data.label;
        return animate &&
            setSelectedBrowser(selectedBrowser && selectedBrowser === label ? null : label);
    }} getColor={function (arc) { return getBrowserColor(arc.data.label); }}/>); }}
        </Pie>
        <Pie data={selectedAlphabetLetter
        ? letters.filter(function (_a) {
            var letter = _a.letter;
            return letter === selectedAlphabetLetter;
        })
        : letters} pieValue={frequency} pieSortValues={function () { return -1; }} outerRadius={radius - donutThickness * 1.3}>
          {function (pie) { return (<AnimatedPie {...pie} animate={animate} getKey={function (_a) {
        var letter = _a.data.letter;
        return letter;
    }} onClickDatum={function (_a) {
        var letter = _a.data.letter;
        return animate &&
            setSelectedAlphabetLetter(selectedAlphabetLetter && selectedAlphabetLetter === letter ? null : letter);
    }} getColor={function (_a) {
        var letter = _a.data.letter;
        return getLetterFrequencyColor(letter);
    }}/>); }}
        </Pie>
      </Group>
      {animate && (<text textAnchor="end" x={width - 16} y={height - 16} fill="white" fontSize={11} fontWeight={300} pointerEvents="none">
          Click segments to update
        </text>)}
    </svg>);
}
var fromLeaveTransition = function (_a) {
    var endAngle = _a.endAngle;
    return ({
        // enter from 360° if end angle is > 180°
        startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
        endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
        opacity: 0,
    });
};
var enterUpdateTransition = function (_a) {
    var startAngle = _a.startAngle, endAngle = _a.endAngle;
    return ({
        startAngle: startAngle,
        endAngle: endAngle,
        opacity: 1,
    });
};
function AnimatedPie(_a) {
    var animate = _a.animate, arcs = _a.arcs, path = _a.path, getKey = _a.getKey, getColor = _a.getColor, onClickDatum = _a.onClickDatum;
    var transitions = useTransition(arcs, {
        from: animate ? fromLeaveTransition : enterUpdateTransition,
        enter: enterUpdateTransition,
        update: enterUpdateTransition,
        leave: animate ? fromLeaveTransition : enterUpdateTransition,
        keys: getKey,
    });
    return transitions(function (props, arc, _a) {
        var key = _a.key;
        var _b = path.centroid(arc), centroidX = _b[0], centroidY = _b[1];
        var hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
        return (<g key={key}>
        <animated.path 
        // compute interpolated path d attribute from intermediate angle values
        d={interpolate([props.startAngle, props.endAngle], function (startAngle, endAngle) {
            return path(__assign(__assign({}, arc), { startAngle: startAngle,
                endAngle: endAngle }));
        })} fill={getColor(arc)} onClick={function () { return onClickDatum(arc); }} onTouchStart={function () { return onClickDatum(arc); }}/>
        {hasSpaceForLabel && (<animated.g style={{ opacity: props.opacity }}>
            <text fill="white" x={centroidX} y={centroidY} dy=".33em" fontSize={9} textAnchor="middle" pointerEvents="none">
              {getKey(arc)}
            </text>
          </animated.g>)}
      </g>);
    });
}
