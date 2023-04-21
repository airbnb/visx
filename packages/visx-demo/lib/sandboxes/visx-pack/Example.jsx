import React from 'react';
import { Group } from '@visx/group';
import { Pack, hierarchy } from '@visx/hierarchy';
import { scaleQuantize } from '@visx/scale';
import rawData from '@visx/mock-data/lib/mocks/exoplanets';
function extent(allData, value) {
    return [Math.min.apply(Math, allData.map(value)), Math.max.apply(Math, allData.map(value))];
}
var filteredPlanets = rawData.filter(function (d) { return d.distance !== 0 && d.distance != null; });
var pack = { children: filteredPlanets, name: 'root', radius: 0, distance: 0 };
var colorScale = scaleQuantize({
    domain: extent(rawData, function (d) { return d.radius; }),
    range: ['#ffe108', '#ffc10e', '#fd6d6f', '#855af2', '#11d2f9', '#49f4e7'],
});
var root = hierarchy(pack)
    .sum(function (d) { return d.radius * d.radius; })
    .sort(function (a, b) {
    // sort by hierarchy, then distance
    return ((a === null || a === void 0 ? void 0 : a.data) ? 1 : -1) - ((b === null || b === void 0 ? void 0 : b.data) ? 1 : -1) ||
        (a.children ? 1 : -1) - (b.children ? 1 : -1) ||
        (a.data.distance == null ? -1 : 1) - (b.data.distance == null ? -1 : 1) ||
        a.data.distance - b.data.distance;
});
var defaultMargin = { top: 10, left: 30, right: 40, bottom: 80 };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#ffffff"/>

      <Pack root={root} size={[width * 2, height * 2]}>
        {function (packData) {
        var circles = packData.descendants().slice(2); // skip outer hierarchies
        return (<Group top={-height - margin.bottom} left={-width / 2}>
              {circles.map(function (circle, i) { return (<circle key={"circle-" + i} r={circle.r} cx={circle.x} cy={circle.y} fill={colorScale(circle.data.radius)}/>); })}
            </Group>);
    }}
      </Pack>
    </svg>);
}
