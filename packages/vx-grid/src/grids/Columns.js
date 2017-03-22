import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';
import Shape from '@vx/shape';
import Point from '@vx/point';

export default function Columns({
  top = 0,
  left = 0,
  scale,
  height,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  className,
  numTicks = 10,
}) {
  return (
    <Group
      className={cx('vx-columns', className)}
      top={top}
      left={left}
    >
      {scale.ticks && scale.ticks(numTicks).map((d,i) => {
        const x = scale(d);
        const fromPoint = new Point({
          x,
          y: 0,
        });
        const toPoint = new Point({
          x,
          y: height,
        });
        return (
          <Shape.Line
            key={`column-line-${d}-${i}`}
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
