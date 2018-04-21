import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';

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
  labelFill,
  labelFontSize = 10,
  labelStroke = 'white',
  labelStrokeWidth = 3,
  labelPaintOrder = 'stroke',
  className
}) {
  return (
    <Group top={top} left={left}>
      <Line
        className={cx('vx-marker-line', className)}
        from={from}
        to={to}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        transform={transform}
      />
      {label && (
        <text
          x={from.x}
          y={from.y}
          dx={labelDx}
          dy={labelDy}
          fontSize={labelFontSize}
          fill={labelFill || stroke}
          stroke={labelStroke}
          strokeWidth={labelStrokeWidth}
          textAnchor={labelAnchor}
          paintOrder={labelPaintOrder}
        >
          {label}
        </text>
      )}
    </Group>
  );
}
