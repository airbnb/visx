import React from 'react';
import { Graph } from '@visx/network';

export type NetworkProps = {
  width: number;
  height: number;
};

const nodes = [
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 },
];

const links = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0] },
];

const graph = {
  nodes,
  links,
};

export const background = '#272b4d';

export default function Example({ width, height }: NetworkProps) {
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Graph
        graph={graph}
        top={50}
        left={100}
        nodeComponent={() => (
          <text dx="-0.5em" dy="0.5em" fontSize={28}>
            💜
          </text>
        )}
        linkComponent={({ link: { source, target } }) => (
          <>
            <line
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              strokeWidth={2}
              stroke="pink"
              strokeOpacity={0.5}
              strokeDasharray="8,4"
            />
            <text
              textAnchor="middle"
              x={Math.abs(source.x + target.x) / 2}
              y={Math.abs(source.y + target.y) / 2}
              dy="0.25em"
              fill="white"
            >
              link
            </text>
          </>
        )}
      />
    </svg>
  );
}
