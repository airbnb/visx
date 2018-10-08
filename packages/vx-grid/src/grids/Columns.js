import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';
import { Point } from '@vx/point';

Columns.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDasharray: PropTypes.string,
  numTicks: PropTypes.number,
  lineStyle: PropTypes.object,
  offset: PropTypes.number,
  scale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired
};

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
  lineStyle,
  offset,
  ...restProps
}) {
  const ticks = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  return (
    <Group className={cx('vx-columns', className)} top={top} left={left}>
      {ticks.map((d, i) => {
        const x = offset ? scale(d) + offset : scale(d);
        const fromPoint = new Point({
          x,
          y: 0
        });
        const toPoint = new Point({
          x,
          y: height
        });
        return (
          <Line
            key={`column-line-${d}-${i}`}
            from={fromPoint}
            to={toPoint}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
