import React from 'react';
import { Group } from '@vx/group';
import { Pack, hierarchy } from '@vx/hierarchy';
import { scaleQuantize } from '@vx/scale';
import rawData, { Exoplanets as Datum } from '@vx/mock-data/lib/mocks/exoplanets';
import { MarginShape } from '../../types';

function extent<D>(allData: D[], value: (d: D) => number): [number, number] {
  return [Math.min(...allData.map(value)), Math.max(...allData.map(value))];
}

const filteredPlanets = rawData.filter(d => d.distance !== 0 && d.distance != null);
const pack = { children: filteredPlanets, name: 'root', radius: 0, distance: 0 };

const colorScale = scaleQuantize({
  domain: extent(rawData, d => d.radius),
  range: ['#ffe108', '#ffc10e', '#fd6d6f', '#855af2', '#11d2f9', '#49f4e7'],
});

const root = hierarchy<Datum>(pack)
  .sum(d => d.radius * d.radius)
  .sort((a, b) => {
    return (
      (a.children ? 1 : -1) - (b.children ? 1 : -1) ||
      (isNaN(a.data.distance) ? -1 : 1) - (isNaN(b.data.distance) ? -1 : 1) ||
      a.data.distance - b.data.distance
    );
  });

export default ({
  width,
  height,
  margin = {
    top: 10,
    left: 30,
    right: 40,
    bottom: 80,
  },
}: {
  width: number;
  height: number;
  margin: MarginShape;
}) => {
  if (width < 10) return null;

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#ffffff" />

      <Pack<Datum> root={root} size={[width * 2, height * 2]}>
        {packData => {
          const circles = packData.descendants().slice(2);
          return (
            <Group top={-height - margin.bottom} left={-width / 2}>
              {circles.map((circle, i) => {
                return (
                  <circle
                    key={`cir-${i}`}
                    r={circle.r}
                    cx={circle.x}
                    cy={circle.y}
                    fill={colorScale(circle.data.radius)}
                  />
                );
              })}
            </Group>
          );
        }}
      </Pack>
    </svg>
  );
};
