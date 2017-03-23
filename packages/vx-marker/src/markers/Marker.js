import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';
import Shape from '@vx/shape';

export default function Marker({
  top = 0,
  left = 0,
  from,
  to,
  stroke = 'magenta',
  strokeWidth = 2,
  strokeDasharray,
  fill,
  transform,
  label,
  labelAnchor = 'left',
  labelOrientation = 'horizontal',
  labelVerticalAlign = 'top',
  labelHorizontalAlign = 'right',
  labelDx = 0,
  labelDy = 0,
  className,
}) {
  return (
    <Group top={top} left={left}>
      <Shape.Line
        className={cx('vx-marker-line', className)}
        from={from}
        to={to}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        transform={transform}
      />
      {label &&
        <text
          x={from.x}
          y={to.x}
          dx={labelDx}
          dy={labelDy}
          textAnchor={labelAnchor}
        >
          {label}
        </text>
      }
    </Group>
  );
}
