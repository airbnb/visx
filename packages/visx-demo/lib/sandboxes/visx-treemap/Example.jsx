import React, { useState } from 'react';
import { Group } from '@visx/group';
import { Treemap, hierarchy, stratify, treemapSquarify, treemapBinary, treemapDice, treemapResquarify, treemapSlice, treemapSliceDice, } from '@visx/hierarchy';
import shakespeare from '@visx/mock-data/lib/mocks/shakespeare';
import { scaleLinear } from '@visx/scale';
export var color1 = '#f3e9d2';
var color2 = '#4281a4';
export var background = '#114b5f';
var colorScale = scaleLinear({
    domain: [0, Math.max.apply(Math, shakespeare.map(function (d) { var _a; return (_a = d.size) !== null && _a !== void 0 ? _a : 0; }))],
    range: [color2, color1],
});
var data = stratify()
    .id(function (d) { return d.id; })
    .parentId(function (d) { return d.parent; })(shakespeare)
    .sum(function (d) { var _a; return (_a = d.size) !== null && _a !== void 0 ? _a : 0; });
var tileMethods = {
    treemapSquarify: treemapSquarify,
    treemapBinary: treemapBinary,
    treemapDice: treemapDice,
    treemapResquarify: treemapResquarify,
    treemapSlice: treemapSlice,
    treemapSliceDice: treemapSliceDice,
};
var defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };
export default function TreemapDemo(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var _c = useState('treemapSquarify'), tileMethod = _c[0], setTileMethod = _c[1];
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    var root = hierarchy(data).sort(function (a, b) { return (b.value || 0) - (a.value || 0); });
    return width < 10 ? null : (<div>
      <label>tile method</label>{' '}
      <select onClick={function (e) { return e.stopPropagation(); }} onChange={function (e) { return setTileMethod(e.target.value); }} value={tileMethod}>
        {Object.keys(tileMethods).map(function (tile) { return (<option key={tile} value={tile}>
            {tile}
          </option>); })}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={background}/>
          <Treemap top={margin.top} root={root} size={[xMax, yMax]} tile={tileMethods[tileMethod]} round>
            {function (treemap) { return (<Group>
                {treemap
        .descendants()
        .reverse()
        .map(function (node, i) {
        var nodeWidth = node.x1 - node.x0;
        var nodeHeight = node.y1 - node.y0;
        return (<Group key={"node-" + i} top={node.y0 + margin.top} left={node.x0 + margin.left}>
                        {node.depth === 1 && (<rect width={nodeWidth} height={nodeHeight} stroke={background} strokeWidth={4} fill="transparent"/>)}
                        {node.depth > 2 && (<rect width={nodeWidth} height={nodeHeight} stroke={background} fill={colorScale(node.value || 0)}/>)}
                      </Group>);
    })}
              </Group>); }}
          </Treemap>
        </svg>
      </div>
    </div>);
}
