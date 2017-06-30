import React from 'react';
import { Group } from '@vx/group';
import { GlyphCircle } from '@vx/glyph';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';

const points = genRandomNormalPoints(600).filter((d, i) => {
  return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

export default ({ width, height }) => {
  const xMax = width;
  const yMax = height - 80;
  if (width < 10) return null;

  const xScale = scaleLinear({
    domain: [1.3, 2.2],
    range: [0, xMax],
    clamp: true,
  });
  const yScale = scaleLinear({
    domain: [0.75, 1.6],
    range: [yMax, 0],
    clamp: true,
  });

  return (
    <svg width={width} height={height}>
      <GradientPinkRed id="pink" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill={`url(#pink)`}
      />
      <Group>
        {points.map((point, i) => {
          return (
            <GlyphCircle
              key={`point-${point.x}-${i}`}
              fill={'#f6c431'}
              left={xScale(x(point))}
              top={yScale(y(point))}
              size={i % 3 === 0 ? 2 : 3}
            />
          );
        })}
      </Group>
    </svg>
  );
};
