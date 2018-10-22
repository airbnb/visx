import React from 'react';
import PropTypes from 'prop-types';

LegendItem.propTypes = {
  flexDirection: PropTypes.string,
  margin: PropTypes.string,
  label: PropTypes.object.isRequired
};

export default function LegendItem({ children, flexDirection, margin, label, ...restProps }) {
  return (
    <div
      className="vx-legend-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection,
        margin
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
