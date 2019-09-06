import React from 'react';
import { Group } from '@vx/group';
import { Pack } from '@vx/hierarchy';
import { hierarchy } from 'd3-hierarchy';
import { scaleQuantize } from '@vx/scale';
import { exoplanets as data } from '@vx/mock-data';

const extent = (allData, value = d => d) => [
  Math.min(...allData.map(value)),
  Math.max(...allData.map(value)),
];

const exoplanets = data.filter(d => d.distance === 0);
const planets = data.filter(d => d.distance !== 0);
const pack = { children: [{ children: planets }].concat(exoplanets) };

const colorScale = scaleQuantize({
  domain: extent(data, d => d.radius),
  range: ['#ffe108', '#ffc10e', '#fd6d6f', '#855af2', '#11d2f9', '#49f4e7'],
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
}) => {
  if (width < 10) return null;

  const root = hierarchy(pack)
    .sum(d => d.radius * d.radius)
    .sort((a, b) => {
      return (
        !a.children - !b.children ||
        Math.isNaN(a.data.distance) - Math.isNaN(b.data.distance) ||
        a.data.distance - b.data.distance
      );
    });

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#ffffff" />
      <Pack root={root} size={[width * 2, height * 2]}>
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
