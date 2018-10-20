import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Rows from './Rows';
import Columns from './Columns';

Grid.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDasharray: PropTypes.string,
  numTicksRows: PropTypes.number,
  numTicksColumns: PropTypes.number,
  rowLineStyle: PropTypes.object,
  columnLineStyle: PropTypes.object,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  rowTickValues: PropTypes.array,
  columnTickValues: PropTypes.array
};

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
  columnLineStyle,
  xOffset,
  yOffset,
  rowTickValues,
  columnTickValues,
  ...restProps
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
        offset={yOffset}
        tickValues={rowTickValues}
        {...restProps}
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
        offset={xOffset}
        tickValues={columnTickValues}
        {...restProps}
      />
    </Group>
  );
}
