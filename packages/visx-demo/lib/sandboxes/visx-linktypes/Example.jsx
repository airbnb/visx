import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
var data = {
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
var defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };
export default function Example(_a) {
    var totalWidth = _a.width, totalHeight = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    var _c = useState('cartesian'), layout = _c[0], setLayout = _c[1];
    var _d = useState('horizontal'), orientation = _d[0], setOrientation = _d[1];
    var _e = useState('diagonal'), linkType = _e[0], setLinkType = _e[1];
    var _f = useState(0.5), stepPercent = _f[0], setStepPercent = _f[1];
    var forceUpdate = useForceUpdate();
    var innerWidth = totalWidth - margin.left - margin.right;
    var innerHeight = totalHeight - margin.top - margin.bottom;
    var origin;
    var sizeWidth;
    var sizeHeight;
    if (layout === 'polar') {
        origin = {
            x: innerWidth / 2,
            y: innerHeight / 2,
        };
        sizeWidth = 2 * Math.PI;
        sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    }
    else {
        origin = { x: 0, y: 0 };
        if (orientation === 'vertical') {
            sizeWidth = innerWidth;
            sizeHeight = innerHeight;
        }
        else {
            sizeWidth = innerHeight;
            sizeHeight = innerWidth;
        }
    }
    var LinkComponent = getLinkComponent({ layout: layout, linkType: linkType, orientation: orientation });
    return totalWidth < 10 ? null : (<div>
      <LinkControls layout={layout} orientation={orientation} linkType={linkType} stepPercent={stepPercent} setLayout={setLayout} setOrientation={setOrientation} setLinkType={setLinkType} setStepPercent={setStepPercent}/>
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e"/>
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d"/>
        <Group top={margin.top} left={margin.left}>
          <Tree root={hierarchy(data, function (d) { return (d.isExpanded ? null : d.children); })} size={[sizeWidth, sizeHeight]} separation={function (a, b) { return (a.parent === b.parent ? 1 : 0.5) / a.depth; }}>
            {function (tree) { return (<Group top={origin.y} left={origin.x}>
                {tree.links().map(function (link, i) { return (<LinkComponent key={i} data={link} percent={stepPercent} stroke="rgb(254,110,158,0.6)" strokeWidth="1" fill="none"/>); })}

                {tree.descendants().map(function (node, key) {
        var width = 40;
        var height = 20;
        var top;
        var left;
        if (layout === 'polar') {
            var _a = pointRadial(node.x, node.y), radialX = _a[0], radialY = _a[1];
            top = radialY;
            left = radialX;
        }
        else if (orientation === 'vertical') {
            top = node.y;
            left = node.x;
        }
        else {
            top = node.x;
            left = node.y;
        }
        return (<Group top={top} left={left} key={key}>
                      {node.depth === 0 && (<circle r={12} fill="url('#links-gradient')" onClick={function () {
            node.data.isExpanded = !node.data.isExpanded;
            console.log(node);
            forceUpdate();
        }}/>)}
                      {node.depth !== 0 && (<rect height={height} width={width} y={-height / 2} x={-width / 2} fill="#272b4d" stroke={node.data.children ? '#03c0dc' : '#26deb0'} strokeWidth={1} strokeDasharray={node.data.children ? '0' : '2,2'} strokeOpacity={node.data.children ? 1 : 0.6} rx={node.data.children ? 0 : 10} onClick={function () {
            node.data.isExpanded = !node.data.isExpanded;
            console.log(node);
            forceUpdate();
        }}/>)}
                      <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}>
                        {node.data.name}
                      </text>
                    </Group>);
    })}
              </Group>); }}
          </Tree>
        </Group>
      </svg>
    </div>);
}
