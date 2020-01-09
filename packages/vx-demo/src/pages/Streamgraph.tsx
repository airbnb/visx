import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../components/tiles/Streamgraph';

export default () => {
  return (
    <Show
      component={Streamgraph}
      title="Streamgraph"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      }}
    >
      {`// Inspired by Mike Bostock's Streamgraph & Lee Byron’s test data generator.
// https://bl.ocks.org/mbostock/4060954
// Inspired by Mike Bostocks Streamgraph bumps
// https://bl.ocks.org/mbostock/4060954

import React, { useState } from 'react';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { transpose } from 'd3-array';
import { ShowProvidedProps } from '../../types';

// utils
const range = (n: number) => Array.from(new Array(n), (d, i) => i);

const bump = (array: number[], n: number) => {
  const x = 1 / (0.1 + Math.random());
  const y = 2 * Math.random() - 0.5;
  const z = 10 / (0.1 + Math.random());
  for (let i = 0; i < n; i += 1) {
    const w = (i / n - y) * z;
    array[i] += x * Math.exp(-w * w);
  }
};

const bumps = (n: number, m: number): number[] => {
  const arr = [];
  let i: number;
  for (i = 0; i < n; i += 1) arr[i] = 0;
  for (i = 0; i < m; i += 1) bump(arr, n);
  return arr;
};

// constants
const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;

const keys = range(NUM_LAYERS);

// scales
const yScale = scaleLinear<number>({
  domain: [-30, 50],
});
const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
});
const colorScale = scaleOrdinal<string>({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
});
const patternScale = scaleOrdinal<string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
});

function useForceUpdate() {
  const [, setValue] = useState<number>(0);
  return () => setValue(value => value + 1); // update state to force render
}

export default function Streamgraph({ width, height }: ShowProvidedProps) {
  const forceUpdate = useForceUpdate();

  if (width < 10) return null;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  // generate layers in render to update on touch
  const layers = transpose<number>(keys.map(() => bumps(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)));

  return (
    <svg width={width} height={height}>
      <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#036ecf" complement />
      <PatternWaves
        id="cherry"
        height={12}
        width={12}
        fill="transparent"
        stroke="#232493"
        strokeWidth={1}
      />
      <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
      <PatternCircles
        complement
        id="circles"
        height={60}
        width={60}
        radius={10}
        fill="transparent"
      />
      <g onClick={() => forceUpdate()} onTouchStart={() => forceUpdate()}>
        <rect x={0} y={0} width={width} height={height} fill="#ffdede" rx={14} />
        <Stack
          data={layers}
          keys={keys}
          offset="wiggle"
          color={colorScale}
          x={(d, i) => xScale(i)}
          y0={d => yScale(d[0])}
          y1={d => yScale(d[1])}
        >
          {({ stacks, path }) =>
            stacks.map(stack => {
              const d = path(stack);
              const color = colorScale(stack.key);
              const pattern = patternScale(stack.key);
              return (
                <g key={\`series-\${stack.key}\`}>
                  <path d={d || ''} fill={color} />
                  {pattern !== 'circles' && <path d={d} fill={\`url(#\${pattern})\`} />}
                </g>
              );
            })
          }
        </Stack>
      </g>
    </svg>
  );
}
`}
    </Show>
  );
};
