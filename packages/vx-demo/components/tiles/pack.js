import React from 'react';
import { Group } from '@vx/group';
import { Pack } from '@vx/hierarchy';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';
import { scaleQuantize } from '@vx/scale';
import { exoplanets as data } from '@vx/mock-data';
import { extent } from 'd3-array';

const exoplanets = data.filter(d => d.distance === 0);
const planets = data.filter(d => d.distance !== 0);
const raw = { children: [{ children: planets }].concat(exoplanets) };

const color = scaleQuantize({
  range: [
    '#49f4e7',
    '#11d2f9',
    '#855af2',
    '#fd6d6f',
    '#ffc10e',
    '#ffe108',
  ].reverse(),
  domain: extent(data, d => +d.radius),
});

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 10,
    left: 30,
    right: 40,
    bottom: 80,
  },
}) => {
  if (width < 10) return null;
  const data = hierarchy(raw)
    .sum(d => d.radius * d.radius)
    .sort((a, b) => {
      return (
        !a.children - !b.children ||
        isNaN(a.data.distance) - isNaN(b.data.distance) ||
        a.data.distance - b.data.distance
      );
    });
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#ffffff" />
      <Pack
        top={-height - margin.bottom}
        left={-width / 2}
        root={data}
        size={[width * 2, height * 2]}
      >
        {({ data }) => {
          const desc = data.descendants().slice(2);
          return desc.map((d, i) => {
            return (
              <circle
                key={`cir-${i}`}
                r={d.r}
                cx={d.x}
                cy={d.y}
                fill={color(+d.data.radius)}
              />
            );
          });
        }}
      </Pack>
    </svg>
  );
};
