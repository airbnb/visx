/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Inspired by Mike Bostock's Streamgraph & Lee Byron’s test data generator:
 * https://bl.ocks.org/mbostock/4060954
 */
import React from 'react';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { transpose } from 'd3-array';
import { animated, useSpring } from 'react-spring';

import useForceUpdate from './useForceUpdate';
import generateData from './generateData';

// constants
const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;
const NO_PATTERN = 'transparent';
export const BACKGROUND = '#ffe1ff';

// utils
const range = (n: number) => Array.from(new Array(n), (_, i) => i);

const keys = range(NUM_LAYERS);

// scales
const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
});
const yScale = scaleLinear<number>({
  domain: [-30, 50],
});
const colorScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653'],
});
const patternScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', NO_PATTERN, NO_PATTERN, NO_PATTERN, NO_PATTERN],
});

// accessors
type Datum = number[];
const getY0 = (d: Datum) => yScale(d[0]);
const getY1 = (d: Datum) => yScale(d[1]);

export type StreamGraphProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export default function Streamgraph({ width, height, animate = true }: StreamGraphProps) {
  const forceUpdate = useForceUpdate();
  const handlePress = () => forceUpdate();

  if (width < 10) return null;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  // generate layers in render to update on touch
  const layers = transpose<number>(
    keys.map(() => generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)),
  );

  return (
    <svg width={width} height={height}>
      <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#9cfaff" complement />
      <PatternWaves
        id="cherry"
        height={12}
        width={12}
        fill="transparent"
        stroke="#d0ffff"
        strokeWidth={1}
      />
      <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
      <PatternCircles
        id="transparent"
        height={60}
        width={60}
        radius={10}
        fill="transparent"
        complement
      />

      <g onClick={handlePress} onTouchStart={handlePress}>
        <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
        <Stack<number[], number>
          data={layers}
          keys={keys}
          offset="wiggle"
          color={colorScale}
          x={(_, i) => xScale(i)}
          y0={getY0}
          y1={getY1}
        >
          {({ stacks, path }) =>
            stacks.map(stack => {
              // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
              const tweened = animate ? useSpring({ d: path(stack) }) : { d: path(stack) };
              const color = colorScale(stack.key);
              const pattern = patternScale(stack.key);
              return (
                <g key={`series-${stack.key}`}>
                  <animated.path d={tweened.d || ''} fill={color} />
                  <animated.path d={tweened.d || ''} fill={`url(#${pattern})`} />
                </g>
              );
            })
          }
        </Stack>
      </g>
    </svg>
  );
}
