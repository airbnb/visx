import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';

Marker.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  from: PropTypes.object,
  to: PropTypes.object,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  transform: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  labelAnchor: PropTypes.string,
  labelDx: PropTypes.number,
  labelDy: PropTypes.number,
  labelFill: PropTypes.string,
  labelStroke: PropTypes.string,
  labelStrokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelPaintOrder: PropTypes.string,
  className: PropTypes.string
};

export default function Marker({
  top = 0,
  left = 0,
  from,
  to,
  stroke = 'magenta',
  strokeWidth = 2,
  strokeDasharray,
  transform,
  label,
  labelAnchor = 'left',
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
