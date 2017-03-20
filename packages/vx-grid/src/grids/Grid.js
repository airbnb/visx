import React from 'react';
import cx from 'classnames';
import Group from '@vx/group';
import Rows from './Rows';
import Columns from './Columns';

export default function Grid({
  top,
  left,
  xScale,
  yScale,
  width,
  height,
  className,
  stroke,
  strokeWidth,
  strokeDasharray,
}) {
  return (
    <Group
      className={cx('vx-grid', className)}
      top={top}
      left={left}
    >
      <Rows
        className={className}
        scale={xScale}
        width={width}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      <Columns
        className={className}
        scale={yScale}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
    </Group>
  );
}
