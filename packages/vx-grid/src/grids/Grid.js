import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
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
  numTicksRows,
  numTicksColumns,
  rowLineStyle,
  columnLineStyle
}) {
  return (
    <Group className={cx('vx-grid', className)} top={top} left={left}>
      <Rows
        className={className}
        scale={yScale}
        width={width}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        numTicks={numTicksRows}
        style={rowLineStyle}
      />
      <Columns
        className={className}
        scale={xScale}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        numTicks={numTicksColumns}
        style={columnLineStyle}
      />
    </Group>
  );
}
