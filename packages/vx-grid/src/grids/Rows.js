import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';
import Shape from '@vx/shape';

export default function Rows({
  top = 0,
  left = 0,
  scale,
  width,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
}) {
  return (
    <Group
      className={cx('vx-rows', className)}
      top={top}
      left={left}
    >
      {scale.ticks && scale.ticks().map((d,i) => {
        const y = scale(d);
        const fromPoint = new Point({
          x: 0,
          y
        });
        const toPoint = new Point({
          x: width,
          y
        });
        return (
          <Shape.Line
            key={`row-line-${d}-${i}`}
            from={fromPoint}
            to={toPoint}
            stroke={{
              color: stroke,
              width: strokeWidth,
              dasharray: strokeDasharray,
            }}
          />
        );
      })}
    </Group>
  );
}
