import React, { FC } from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { PatternLines } from '@vx/pattern';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { max } from 'd3-array';
import { MarginShape } from '../../types/index';

const data = letterFrequency;

function round(value: number, precision?: number): number {
  const multiplier = 10 ** (precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

type SimpleBarProps = { width: number; height: number; margin: MarginShape };

const SimpleBar: FC<SimpleBarProps> = ({ width, height, margin }) => {
  // accessors
  const x = d => d.letter;
  const y = d => Number(d.frequency) * 100;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)],
  });

  return (
    <svg width={width} height={height}>
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke="black"
        strokeWidth={1}
        orientation={['diagonal']}
      />
      {data.map(d => {
        const barHeight = yMax - yScale(y(d));
        return (
          <Group key={`bar-${x(d)}`} left={margin.left} top={margin.top}>
            <Bar
              width={xScale.bandwidth()}
              height={barHeight}
              x={xScale(x(d))}
              y={yMax - barHeight}
              fill="url('#lines')"
              stroke="black"
              strokeWidth={1}
            />
            <text x={xScale(x(d))} y={yMax - barHeight} fill="black" fontSize={14} dy="-.2em">
              {`${round(y(d))}%`}
            </text>
            <text x={xScale(x(d))} y={yMax} fill="black" fontSize={14} dx=".32em" dy="1em">
              {x(d)}
            </text>
          </Group>
        );
      })}
    </svg>
  );
};

export default SimpleBar;
