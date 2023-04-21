import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Cluster, hierarchy } from '@visx/hierarchy';
import { LinkVertical } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
var citrus = '#ddf163';
var white = '#ffffff';
export var green = '#79d259';
var aqua = '#37ac8c';
var merlinsbeard = '#f7f7f3';
export var background = '#306c90';
var clusterData = {
    name: '$',
    children: [
        {
            name: 'A',
            children: [
                { name: 'A1' },
                { name: 'A2' },
                {
                    name: 'C',
                    children: [
                        {
                            name: 'C1',
                        },
                    ],
                },
            ],
        },
        {
            name: 'B',
            children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
        },
        {
            name: 'X',
            children: [
                {
                    name: 'Z',
                },
            ],
        },
    ],
};
function RootNode(_a) {
    var node = _a.node;
    var width = 40;
    var height = 20;
    var centerX = -width / 2;
    var centerY = -height / 2;
    return (<Group top={node.y} left={node.x}>
      <rect width={width} height={height} y={centerY} x={centerX} fill="url('#top')"/>
      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={background}>
        {node.data.name}
      </text>
    </Group>);
}
function Node(_a) {
    var node = _a.node;
    var isRoot = node.depth === 0;
    var isParent = !!node.children;
    if (isRoot)
        return <RootNode node={node}/>;
    return (<Group top={node.y} left={node.x}>
      {node.depth !== 0 && (<circle r={12} fill={background} stroke={isParent ? white : citrus} onClick={function () {
        alert("clicked: " + JSON.stringify(node.data.name));
    }}/>)}
      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={isParent ? white : citrus}>
        {node.data.name}
      </text>
    </Group>);
}
var defaultMargin = { top: 40, left: 0, right: 0, bottom: 40 };
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var data = useMemo(function () { return hierarchy(clusterData); }, []);
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    return width < 10 ? null : (<svg width={width} height={height}>
      <LinearGradient id="top" from={green} to={aqua}/>
      <rect width={width} height={height} rx={14} fill={background}/>
      <Cluster root={data} size={[xMax, yMax]}>
        {function (cluster) { return (<Group top={margin.top} left={margin.left}>
            {cluster.links().map(function (link, i) { return (<LinkVertical key={"cluster-link-" + i} data={link} stroke={merlinsbeard} strokeWidth="1" strokeOpacity={0.2} fill="none"/>); })}
            {cluster.descendants().map(function (node, i) { return (<Node key={"cluster-node-" + i} node={node}/>); })}
          </Group>); }}
      </Cluster>
    </svg>);
}
