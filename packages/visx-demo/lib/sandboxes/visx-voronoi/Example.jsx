import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientOrangeRed, GradientPinkRed } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';
import { getSeededRandom } from '@visx/mock-data';
var seededRandom = getSeededRandom(0.88);
var data = new Array(150).fill(null).map(function () { return ({
    x: seededRandom(),
    y: seededRandom(),
    id: Math.random().toString(36).slice(2),
}); });
var neighborRadius = 75;
var defaultMargin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 76,
};
function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    var voronoiLayout = useMemo(function () {
        return voronoi({
            x: function (d) { return d.x * innerWidth; },
            y: function (d) { return d.y * innerHeight; },
            width: innerWidth,
            height: innerHeight,
        })(data);
    }, [innerWidth, innerHeight]);
    var polygons = voronoiLayout.polygons();
    var svgRef = useRef(null);
    var _c = useState(null), hoveredId = _c[0], setHoveredId = _c[1];
    var _d = useState(new Set()), neighborIds = _d[0], setNeighborIds = _d[1];
    return width < 10 ? null : (<svg width={width} height={height} ref={svgRef}>
      <GradientOrangeRed id="voronoi_orange_red"/>
      <GradientPinkRed id="voronoi_pink_red"/>
      <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} rx={14}/>
      <Group top={margin.top} left={margin.left} clipPath="url(#voronoi_clip)" onMouseMove={function (event) {
        if (!svgRef.current)
            return;
        // find the nearest polygon to the current mouse position
        var point = localPoint(svgRef.current, event);
        if (!point)
            return;
        var closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        // find neighboring polygons to hightlight
        if (closest && closest.data.id !== hoveredId) {
            var neighbors_1 = new Set();
            var cell = voronoiLayout.cells[closest.index];
            if (!cell)
                return;
            cell.halfedges.forEach(function (index) {
                var edge = voronoiLayout.edges[index];
                var left = edge.left, right = edge.right;
                if (left && left !== closest)
                    neighbors_1.add(left.data.id);
                else if (right && right !== closest)
                    neighbors_1.add(right.data.id);
            });
            setNeighborIds(neighbors_1);
            setHoveredId(closest.data.id);
        }
    }} onMouseLeave={function () {
        setHoveredId(null);
        setNeighborIds(new Set());
    }}>
        {polygons.map(function (polygon) { return (<VoronoiPolygon key={"polygon-" + polygon.data.id} polygon={polygon} fill={hoveredId && (polygon.data.id === hoveredId || neighborIds.has(polygon.data.id))
        ? 'url(#voronoi_orange_red)'
        : 'url(#voronoi_pink_red)'} stroke="#fff" strokeWidth={1} fillOpacity={hoveredId && neighborIds.has(polygon.data.id) ? 0.5 : 1}/>); })}
        {data.map(function (_a) {
        var x = _a.x, y = _a.y, id = _a.id;
        return (<circle key={"circle-" + id} r={2} cx={x * innerWidth} cy={y * innerHeight} fill={id === hoveredId ? 'fuchsia' : '#fff'} fillOpacity={0.8}/>);
    })}
      </Group>
    </svg>);
}
export default Example;
