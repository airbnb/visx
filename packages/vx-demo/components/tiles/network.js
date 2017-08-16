import React from 'react';
import { Graph } from '@vx/network';
import { scaleOrdinal, schemeCategory20c } from 'd3-scale';

const nodes = [
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 },
];

const dataSample = {
  nodes,
  links: [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0] },
  ],
};

export default ({ width, height }) => {
  if (width < 10) return <div />;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#272b4d" />
      <Graph graph={dataSample} />
    </svg>
  );
};
