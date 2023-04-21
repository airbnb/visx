import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
var peach = '#fd9b93';
var pink = '#fe6e9e';
var blue = '#03c0dc';
var green = '#26deb0';
var plum = '#71248e';
var lightpurple = '#374469';
var white = '#ffffff';
export var background = '#272b4d';
var rawTree = {
    name: 'T',
    children: [
        {
            name: 'A',
            children: [
                { name: 'A1' },
                { name: 'A2' },
                { name: 'A3' },
                {
                    name: 'C',
                    children: [
                        {
                            name: 'C1',
                        },
                        {
                            name: 'D',
                            children: [
                                {
                                    name: 'D1',
                                },
                                {
                                    name: 'D2',
                                },
                                {
                                    name: 'D3',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        { name: 'Z' },
        {
            name: 'B',
            children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
        },
    ],
};
function RootNode(_a) {
    var node = _a.node;
    return (<Group top={node.x} left={node.y}>
      <circle r={12} fill="url('#lg')"/>
      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={plum}>
        {node.data.name}
      </text>
    </Group>);
}
function ParentNode(_a) {
    var node = _a.node;
    var width = 40;
    var height = 20;
    var centerX = -width / 2;
    var centerY = -height / 2;
    return (<Group top={node.x} left={node.y}>
      <rect height={height} width={width} y={centerY} x={centerX} fill={background} stroke={blue} strokeWidth={1} onClick={function () {
        alert("clicked: " + JSON.stringify(node.data.name));
    }}/>
      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={white}>
        {node.data.name}
      </text>
    </Group>);
}
/** Handles rendering Root, Parent, and other Nodes. */
function Node(_a) {
    var node = _a.node;
    var width = 40;
    var height = 20;
    var centerX = -width / 2;
    var centerY = -height / 2;
    var isRoot = node.depth === 0;
    var isParent = !!node.children;
    if (isRoot)
        return <RootNode node={node}/>;
    if (isParent)
        return <ParentNode node={node}/>;
    return (<Group top={node.x} left={node.y}>
      <rect height={height} width={width} y={centerY} x={centerX} fill={background} stroke={green} strokeWidth={1} strokeDasharray="2,2" strokeOpacity={0.6} rx={10} onClick={function () {
        alert("clicked: " + JSON.stringify(node.data.name));
    }}/>
      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" fill={green} style={{ pointerEvents: 'none' }}>
        {node.data.name}
      </text>
    </Group>);
}
var defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var data = useMemo(function () { return hierarchy(rawTree); }, []);
    var yMax = height - margin.top - margin.bottom;
    var xMax = width - margin.left - margin.right;
    return width < 10 ? null : (<svg width={width} height={height}>
      <LinearGradient id="lg" from={peach} to={pink}/>
      <rect width={width} height={height} rx={14} fill={background}/>
      <Tree root={data} size={[yMax, xMax]}>
        {function (tree) { return (<Group top={margin.top} left={margin.left}>
            {tree.links().map(function (link, i) { return (<LinkHorizontal key={"link-" + i} data={link} stroke={lightpurple} strokeWidth="1" fill="none"/>); })}
            {tree.descendants().map(function (node, i) { return (<Node key={"node-" + i} node={node}/>); })}
          </Group>); }}
      </Tree>
    </svg>);
}
