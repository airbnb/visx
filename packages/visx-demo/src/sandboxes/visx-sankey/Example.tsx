import React from 'react';
import { Sankey } from '@visx/sankey';
import energy from './energy.json';

export type SankeyDemoProps = {
  width: number;
  height: number;
};

export default function SankeyDemo({ width, height }) {
  return (
    <svg width={width} height={height}>
      <Sankey root={energy} size={[width, height]} nodePadding={40} />
    </svg>
  );
}
