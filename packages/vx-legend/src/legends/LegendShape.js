import React from 'react';
import PropTypes from 'prop-types';
import ShapeRect from '../shapes/Rect';
import renderShape from '../util/renderShape';

LegendShape.propTypes = {
  shape: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  margin: PropTypes.any,
  label: PropTypes.any,
  fill: PropTypes.any,
  size: PropTypes.any,
  shapeStyle: PropTypes.any
};

export default function LegendShape({
  shape = ShapeRect,
  width,
  height,
  margin,
  label,
  fill,
  size,
  shapeStyle
}) {
  return (
    <div
      className="vx-legend-shape"
      style={{
        display: 'flex',
        width: !!size ? size({ ...label }) : width,
        height: !!size ? size({ ...label }) : height,
        margin
      }}
    >
      {renderShape({
        shape,
        label,
        width,
        height,
        fill,
        shapeStyle
      })}
    </div>
  );
}
