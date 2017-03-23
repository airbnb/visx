import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';
import Shape from '@vx/shape';

const identity = x => x;

export default LinePathAnnotation({
  top = 0,
  left = 0,
  points,
  stroke = 'black',
  strokeWidth = 1,
  className,
  label,
  labelAnchor = 'left',
  labelOrientation = 'horizontal',
  labelVerticalAlign = 'top',
  labelHorizontalAlign = 'right',
  labelDx = 0,
  labelDy = 0,
  labelFill,
  labelFontSize = 10,
}) {
  return (
    <Group
      className='vx-line-path-annotation-group'
      top={top}
      left={left}
    >
      <Shape.LinePath
        className={cx('vx-line-path-annotation', className)}
        data={points}
        x={p => p.x}
        y={p => p.y}
        xScale={identity}
        yScale={identity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label &&
        <text
          x={endPoint.x}
          y={enPoint.y}
          dx={labelDx}
          dy={labelDy}
          fontSize={labelFontSize}
          fill={labelFill || stroke}
          textAnchor={labelAnchor}
        >
          {label}
        </text>
      }
    </Group>
  );
}
