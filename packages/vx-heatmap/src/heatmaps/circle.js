import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';

export default function HeatmapCircle({
  className,
  data,
  gap = 1,
  step = 0,
  radius = 6,
  xScale,
  yScale,
  colorScale,
  opacityScale = d => 1,
  bin = d => d.bin,
  bins = d => d.bins,
  count = d => d.count,
  ...restProps
}) {
  const r = radius - gap;
  return (
    <Group>
      {data.map((d, i) => {
        return (
          <Group key={`heatmap-${i}`} className="vx-heatmap-column" left={xScale(bin(d))}>
            {bins(d).map((b, j) => {
              return (
                <circle
                  key={`heatmap-tile-circle-${j}`}
                  className={cx('vx-heatmap-circle', className)}
                  fill={colorScale(count(b))}
                  r={r}
                  cx={radius}
                  cy={yScale(bin(b) + step) + radius}
                  fillOpacity={opacityScale(count(b))}
                  {...additionalProps(restProps, {
                    bin: b,
                    index: j,
                    datum: d,
                    datumIndex: i,
                    data
                  })}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}
