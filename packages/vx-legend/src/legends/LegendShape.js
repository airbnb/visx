import React from 'react';
import PropTypes from 'prop-types';

export default function LegendShape({
  shape,
  width,
  height,
  margin,
  value,
}) {
  return (
    <div
      className='vx-legend-shape'
      style={{
        width,
        height,
        margin,
        background: value,
      }}
    >
      {shape}
    </div>
  );
}