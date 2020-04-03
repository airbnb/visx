import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';

import { Svg, Rect } from '@vx/primitives';

const data = letterFrequency.slice(5);

// accessors
const x = d => d.letter;
const y = d => +d.frequency * 100;

export default ({ width, height }) => {
  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
  });

  return (
    <Svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <Rect width={width} height={height} fill={'url(#teal)'} rx={14} />
      <Group top={80}>
        {data.map((d, i) => {
          const letter = x(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(y(d));
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(28, 0, 255, .5)"
              // onClick={event => {
              //   alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              // }}
            />
          );
        })}
      </Group>
    </Svg>
  );
};
