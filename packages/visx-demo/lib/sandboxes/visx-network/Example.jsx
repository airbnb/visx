/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { DefaultNode, Graph } from '@visx/network';
var nodes = [
    { x: 50, y: 20 },
    { x: 200, y: 250 },
    { x: 300, y: 40, color: '#26deb0' },
];
var links = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0], dashed: true },
];
var graph = {
    nodes: nodes,
    links: links,
};
export var background = '#272b4d';
export default function Example(_a) {
    var width = _a.width, height = _a.height;
    return width < 10 ? null : (<svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background}/>
      <Graph graph={graph} top={20} left={100} nodeComponent={function (_a) {
        var color = _a.node.color;
        return color ? <DefaultNode fill={color}/> : <DefaultNode />;
    }} linkComponent={function (_a) {
        var _b = _a.link, source = _b.source, target = _b.target, dashed = _b.dashed;
        return (<line x1={source.x} y1={source.y} x2={target.x} y2={target.y} strokeWidth={2} stroke="#999" strokeOpacity={0.6} strokeDasharray={dashed ? '8,4' : undefined}/>);
    }}/>
    </svg>);
}
