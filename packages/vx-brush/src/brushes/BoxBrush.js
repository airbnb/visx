import React from 'react';
import cx from 'classnames';

export default props => {
  const {
    brush,
    className,
    fill = 'rgba(102, 181, 245, 0.1)',
    stroke = 'rgba(102, 181, 245, 1)',
    strokeWidth = 1,
    ...otherProps
  } = props;
  const { start, end, isBrushing } = brush;
  if (!start) return null;
  if (!end) return null;
  const x = end.x > start.x ? start.x : end.x;
  const y = end.y > start.y ? start.y : end.y;
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);
  return (
    <g className={cx('vx-brush', className)}>
      {isBrushing && (
        <rect
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          x={x}
          y={y}
          width={width}
          height={height}
          {...otherProps}
        />
      )}
    </g>
  );
};
