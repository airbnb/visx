import React from 'react';
import { Polygon } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { GradientPinkRed } from '@visx/gradient';

export const background = '#7f82e3';
const polygonSize = 25;
const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

const polygons = [
  {
    sides: 3,
    fill: 'rgb(174, 238, 248)',
    rotate: 90,
  },
  {
    sides: 4,
    fill: 'rgb(229, 253, 61)',
    rotate: 45,
  },
  {
    sides: 6,
    fill: 'rgb(229, 130, 255)',
    rotate: 0,
  },
  {
    sides: 8,
    fill: 'url(#polygon-pink)',
    rotate: 0,
  },
];

const yScale = scaleBand<number>({
  domain: polygons.map((p, i) => i),
  padding: 0.8,
});

export type PolygonProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export default ({ width, height, margin = defaultMargin }: PolygonProps) => {
  yScale.rangeRound([0, height - margin.top - margin.bottom]);
  const centerX = (width - margin.left - margin.right) / 2;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={background} rx={14} />
      <GradientPinkRed id="polygon-pink" />
      {polygons.map((polygon, i) => (
        <Group
          key={`polygon-${i}`}
          top={(yScale(i) || 0) + polygonSize / 2}
          left={margin.left + centerX}
        >
          <Polygon
            sides={polygon.sides}
            size={polygonSize}
            fill={polygon.fill}
            rotate={polygon.rotate}
          />
        </Group>
      ))}
    </svg>
  );
};
