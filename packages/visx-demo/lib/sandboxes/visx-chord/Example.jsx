import React from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { Chord, Ribbon } from '@visx/chord';
import { scaleOrdinal } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
var pink = '#ff2fab';
var orange = '#ffc62e';
var purple = '#dc04ff';
var purple2 = '#7324ff';
var red = '#d04376';
var green = '#52f091';
var blue = '#04a6ff';
var lime = '#00ddc6';
var bg = '#e4e3d8';
var dataMatrix = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
];
function descending(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
var color = scaleOrdinal({
    domain: [0, 1, 2, 3],
    range: ['url(#gpinkorange)', 'url(#gpurplered)', 'url(#gpurplegreen)', 'url(#gbluelime)'],
});
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.centerSize, centerSize = _b === void 0 ? 20 : _b, _c = _a.events, events = _c === void 0 ? false : _c;
    height -= 77;
    var outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10);
    var innerRadius = outerRadius - centerSize;
    return width < 10 ? null : (<div className="chords">
      <svg width={width} height={height}>
        <LinearGradient id="gpinkorange" from={pink} to={orange} vertical={false}/>
        <LinearGradient id="gpurplered" from={purple} to={red} vertical={false}/>
        <LinearGradient id="gpurplegreen" from={purple2} to={green} vertical={false}/>
        <LinearGradient id="gbluelime" from={blue} to={lime} vertical={false}/>
        <rect width={width} height={height} fill={bg} rx={14}/>
        <Group top={height / 2} left={width / 2}>
          <Chord matrix={dataMatrix} padAngle={0.05} sortSubgroups={descending}>
            {function (_a) {
        var chords = _a.chords;
        return (<g>
                {chords.groups.map(function (group, i) { return (<Arc key={"key-" + i} data={group} innerRadius={innerRadius} outerRadius={outerRadius} fill={color(i)} onClick={function () {
            if (events)
                alert("" + JSON.stringify(group));
        }}/>); })}
                {chords.map(function (chord, i) { return (<Ribbon key={"ribbon-" + i} chord={chord} radius={innerRadius} fill={color(chord.target.index)} fillOpacity={0.75} onClick={function () {
            if (events)
                alert("" + JSON.stringify(chord));
        }}/>); })}
              </g>);
    }}
          </Chord>
        </Group>
      </svg>
      <div className="deets">
        <div>
          Based on Mike Bostock's <a href="https://bl.ocks.org/mbostock/4062006">Chord Diagram</a>
        </div>
      </div>
      <style jsx>{"\n        .chords {\n          display: flex;\n          flex-direction: column;\n          user-select: none;\n        }\n        svg {\n          margin: 1rem 0;\n          cursor: pointer;\n        }\n        .deets {\n          display: flex;\n          flex-direction: row;\n          font-size: 12px;\n        }\n        .deets > div {\n          margin: 0.25rem;\n        }\n      "}</style>
    </div>);
}
