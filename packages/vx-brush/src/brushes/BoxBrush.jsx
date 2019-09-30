import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  brush: PropTypes.shape({
    start: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    end: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    isBrushing: PropTypes.bool,
  }),
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

function BoxBrush({
  brush,
  className,
  fill = 'rgba(102, 181, 245, 0.1)',
  stroke = 'rgba(102, 181, 245, 1)',
  strokeWidth = 1,
  ...otherProps
}) {
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
}

BoxBrush.propTypes = propTypes;

export default BoxBrush;
