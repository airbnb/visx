import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './world-topo.json';
export var background = '#f9f7e8';
// @ts-expect-error
var world = topojson.feature(topology, topology.objects.units);
var color = scaleQuantize({
    domain: [
        Math.min.apply(Math, world.features.map(function (f) { return f.geometry.coordinates.length; })),
        Math.max.apply(Math, world.features.map(function (f) { return f.geometry.coordinates.length; })),
    ],
    range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48'],
});
export default function (_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? false : _b;
    var centerX = width / 2;
    var centerY = height / 2;
    var scale = (width / 630) * 100;
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
      <Mercator data={world.features} scale={scale} translate={[centerX, centerY + 50]}>
        {function (mercator) { return (<g>
            <Graticule graticule={function (g) { return mercator.path(g) || ''; }} stroke="rgba(33,33,33,0.05)"/>
            {mercator.features.map(function (_a, i) {
        var feature = _a.feature, path = _a.path;
        return (<path key={"map-feature-" + i} d={path || ''} fill={color(feature.geometry.coordinates.length)} stroke={background} strokeWidth={0.5} onClick={function () {
            if (events)
                alert("Clicked: " + feature.properties.name + " (" + feature.id + ")");
        }}/>);
    })}
          </g>); }}
      </Mercator>
    </svg>);
}
