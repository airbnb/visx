import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';
import { Point } from '@vx/point';

export default function Rows({
  top = 0,
  left = 0,
  scale,
  width,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  className,
  numTicks = 10,
}) {
  return (
    <Group
      className={cx('vx-rows', className)}
      top={top}
      left={left}
    >
      {scale.ticks && scale.ticks(numTicks).map((d, i) => {
        const y = scale(d);
        const fromPoint = new Point({
          x: 0,
          y,
        });
        const toPoint = new Point({
          x: width,
          y,
        });
        return (
          <Line
            key={`row-line-${d}-${i}`}
            from={fromPoint}
            to={toPoint}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
          />
        );
      })}
    </Group>
  );
}
