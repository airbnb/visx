import React from 'react';
import PropTypes from 'prop-types';

ShapeRect.propTypes = {
  fill: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object
};

export default function ShapeRect({ fill, width, height, style }) {
  return (
    <div
      style={{
        width,
        height,
        background: fill,
        ...style
      }}
    />
  );
}
