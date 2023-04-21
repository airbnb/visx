import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
var data = letterFrequency.slice(5);
var verticalMargin = 120;
// accessors
var getLetter = function (d) { return d.letter; };
var getLetterFrequency = function (d) { return Number(d.frequency) * 100; };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b;
    // bounds
    var xMax = width;
    var yMax = height - verticalMargin;
    // scales, memoize for performance
    var xScale = useMemo(function () {
        return scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(getLetter),
            padding: 0.4,
        });
    }, [xMax]);
    var yScale = useMemo(function () {
        return scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max.apply(Math, data.map(getLetterFrequency))],
        });
    }, [yMax]);
    return width < 10 ? null : (<svg width={width} height={height}>
      <GradientTealBlue id="teal"/>
      <rect width={width} height={height} fill="url(#teal)" rx={14}/>
      <Group top={verticalMargin / 2}>
        {data.map(function (d) {
        var _a;
        var letter = getLetter(d);
        var barWidth = xScale.bandwidth();
        var barHeight = yMax - ((_a = yScale(getLetterFrequency(d))) !== null && _a !== void 0 ? _a : 0);
        var barX = xScale(letter);
        var barY = yMax - barHeight;
        return (<Bar key={"bar-" + letter} x={barX} y={barY} width={barWidth} height={barHeight} fill="rgba(23, 233, 217, .5)" onClick={function () {
            if (events)
                alert("clicked: " + JSON.stringify(Object.values(d)));
        }}/>);
    })}
      </Group>
    </svg>);
}
