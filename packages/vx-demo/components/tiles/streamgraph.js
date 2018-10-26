// Inspired by Mike Bostock's Streamgraph &
// Lee Byron’s test data generator.
// https://bl.ocks.org/mbostock/4060954
// Inspired by Mike Bostocks Streamgraph bumps
// https://bl.ocks.org/mbostock/4060954

import React from 'react';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { transpose } from 'd3-array';

// utils
const range = n => Array.from(Array(n), (d, i) => i);
const bumps = (n, m) => {
  let arr = [];
  let i;
  for (i = 0; i < n; ++i) arr[i] = 0;
  for (i = 0; i < m; ++i) bump(arr, n);
  return arr;
};
const bump = (arr, n) => {
  let x = 1 / (0.1 + Math.random());
  let y = 2 * Math.random() - 0.5;
  let z = 10 / (0.1 + Math.random());
  for (var i = 0; i < n; i++) {
    var w = (i / n - y) * z;
    arr[i] += x * Math.exp(-w * w);
  }
};

// constants
const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;

// scales
const yScale = scaleLinear({
  domain: [-30, 50]
});
const xScale = scaleLinear({
  domain: [0, SAMPLES_PER_LAYER - 1]
});
const colorScale = scaleOrdinal({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e']
});
const patternScale = scaleOrdinal({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles']
});

const keys = range(NUM_LAYERS);

export default class Streamgraph extends React.Component {
  render() {
    const { width, height } = this.props;
    if (width < 10) return null;

    const layers = transpose(keys.map(d => bumps(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)));

    xScale.range([0, width]);
    yScale.range([height, 0]);

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
          complement
        />
        <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
        <PatternCircles
          id="circles"
          height={60}
          width={60}
          radius={10}
          fill="transparent"
          complement
        />
        <g onClick={event => this.forceUpdate()} onTouchStart={event => this.forceUpdate()}>
          <rect x={0} y={0} width={width} height={height} fill={`#ffdede`} rx={14} />
          <Stack
            data={layers}
            keys={keys}
            offset="wiggle"
            color={colorScale}
            x={(d, i) => xScale(i)}
            y0={d => yScale(d[0])}
            y1={d => yScale(d[1])}
          >
            {({ stacks, path }) => {
              return stacks.map((stack, i) => {
                const d = path(stack);
                const color = colorScale(stack.key);
                const pattern = patternScale(stack.key);
                return (
                  <g key={`series-${stack.key}`}>
                    <path d={d} fill={color} />
                    {pattern !== 'circles' && <path d={d} fill={`url(#${pattern})`} />}
                  </g>
                );
              });
            }}
          </Stack>
        </g>
      </svg>
    );
  }
}
