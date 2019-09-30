import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';

ShapeCircle.propTypes = {
  fill: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
};

export default function ShapeCircle({ fill, width, height, style }) {
  const cleanWidth = typeof width === 'string' ? 0 : width;
  const cleanHeight = typeof height === 'string' ? 0 : height;
  const size = Math.max(cleanWidth, cleanHeight);
  const radius = size / 2;
  return (
    <svg width={size} height={size}>
      <Group top={radius} left={radius}>
        <circle r={radius} fill={fill} style={style} />
      </Group>
    </svg>
  );
}
