import React from 'react';
import PropTypes from 'prop-types';
import ClipPath from './ClipPath';

RectClipPath.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function RectClipPath({ id, x = 0, y = 0, width = 1, height = 1, ...restProps }) {
  return (
    <ClipPath id={id}>
      <rect x={x} y={y} width={width} height={height} {...restProps} />
    </ClipPath>
  );
}
