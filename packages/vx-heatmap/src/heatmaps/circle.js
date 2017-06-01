import React from 'react';
import { Group } from '@vx/group';

export default function HeatmapCircle({
  data,
  binWidth,
  gap = 1,
  step,
  xScale,
  yScale,
  colorScale,
  opacityScale,
}) {
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group
            key={`heatmap-${i}`}
            className='vx-heatmap-column'
            left={xScale(d.bin)}
          >
            {d.bins.map((b, i) => {
              const radius = binWidth / 2;
              return (
                <circle
                  key={`heatmap-tile-${i}`}
                  fill={colorScale(b.count)}
                  r={radius - gap}
                  cx={binWidth / 2}
                  cy={yScale(b.bin + step) + radius}
                  fillOpacity={opacityScale(b.count)}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}
