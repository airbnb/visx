import React from 'react';
import { Graph } from '@vx/network';

type Props = {
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

export const backgroundColor = '#272b4d';

export default function Example({ width, height }: Props) {
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={backgroundColor} />
      <Graph graph={graph} />
    </svg>
  );
}
