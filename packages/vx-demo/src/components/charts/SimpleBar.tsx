import * as React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { PatternLines } from '@vx/pattern';
import { scaleBand, scaleLinear } from '@vx/scale';
import { max } from 'd3-array';
import letterFrequency, { LetterFrequency } from '@vx/mock-data/lib/mocks/letterFrequency';
import round from '../util/round';
import { MarginShape } from '../../types';

const data = letterFrequency;

type SimpleBarProps = {
  width: number;
  height: number;
  margin: MarginShape;
};

// accessors
const x = (d: LetterFrequency): string => d.letter;
const y = (d: LetterFrequency): number => Number(d.frequency) * 100;

const SimpleBar: React.FC<SimpleBarProps> = ({ width, height, margin }) => {
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
    domain: [0, max(data, y) as number],
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
      {data.map((d: LetterFrequency) => {
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
