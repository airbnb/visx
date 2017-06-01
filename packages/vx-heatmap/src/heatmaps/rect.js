import React from 'react';
import { Group } from '@vx/group';

export default function HeatmapRect({
  data,
  binWidth,
  binHeight,
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
              return (
                <rect
                  key={`heatmap-tile-${i}`}
                  fill={colorScale(b.count)}
                  width={binWidth - gap}
                  height={binHeight - gap}
                  x={0}
                  y={yScale(b.bin + step) + gap}
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
