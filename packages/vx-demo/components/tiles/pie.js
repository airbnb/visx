import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';

const white = '#ffffff';
const black = '#000000';

const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));

const usage = d => d.usage;
const frequency = d => d.frequency;

export default ({ width, height, margin, events = false }) => {
  if (width < 10) return null;

  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="pie-gradients" />
      <rect rx={14} width={width} height={height} fill="url('#pie-gradients')" />
      <Group top={centerY - margin.top} left={centerX}>
        <Pie
          data={browsers}
          pieValue={usage}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          cornerRadius={3}
          padAngle={0}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const opacity = 1 / (i + 2);
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const { startAngle, endAngle } = arc;
              const hasSpaceForLabel = endAngle - startAngle >= 0.1;
              return (
                <g key={`browser-${arc.data.label}-${i}`}>
                  <path d={pie.path(arc)} fill={white} fillOpacity={opacity} />
                  {hasSpaceForLabel && (
                    <text
                      fill={white}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={9}
                      textAnchor="middle"
                    >
                      {arc.data.label}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>
        <Pie
          data={letters}
          pieValue={frequency}
          pieSortValues={(a, b) => -1}
          outerRadius={radius - 135}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const opacity = 1 / (i + 2);
              const [centroidX, centroidY] = pie.path.centroid(arc);
              return (
                <g key={`letters-${arc.data.label}-${i}`}>
                  <path d={pie.path(arc)} fill={black} fillOpacity={opacity} />
                  <text
                    fill="white"
                    textAnchor="middle"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                  >
                    {arc.data.letter}
                  </text>
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
};
