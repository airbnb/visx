import React from 'react';
import { Polygon } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';

const points = genRandomNormalPoints(250).filter((d, i) => i < 250);

const polygons = [
  {
    fill: 'rgb(174, 238, 248)',
    rotate: 90,
  },
  {
    fill: 'rgb(229, 253, 61)',
    rotate: 45,
  },
  {
    fill: 'rgb(229, 130, 255)',
    rotate: 0,
  },
  {
    fill: 'url(#polygon-pink)',
    rotate: 0,
  },
];

const sides = [3, 4, 6, 8];
const sizes = [2, 24, 5, 10];
const opacities = [0.8, 0.9, 1];

export default ({ width, height }) => {
  const xScale = scaleLinear({
    domain: [1.3, 2.2],
    range: [0, width],
    clamp: true,
  });
  const yScale = scaleLinear({
    domain: [0.75, 1.6],
    range: [height, 0],
  });
  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#7f82e3" rx={14} />
      <GradientPinkRed id="polygon-pink" />
      {points.map((p, i) => {
        const randomSize = Math.floor(Math.random() * sizes.length);
        const randomSide = Math.floor(Math.random() * sides.length);
        const polygon = polygons[Math.floor(Math.random() * polygons.length)];
        const opacity = opacities[Math.floor(Math.random() * opacities.length)];
        const fill = Math.floor(Math.random() * 4) > 0.1;
        return (
          <Group key={`polygon-${i}`} top={yScale(p[1])} left={xScale(p[0])}>
            <Polygon
              sides={sides[randomSide]}
              size={sizes[randomSize]}
              fill={fill ? polygon.fill : 'transparent'}
              stroke={fill ? undefined : polygon.fill}
              strokeWidth={3}
              rotate={polygon.rotate}
              fillOpacity={fill ? opacity : undefined}
            />
          </Group>
        );
      })}
    </svg>
  );
};
