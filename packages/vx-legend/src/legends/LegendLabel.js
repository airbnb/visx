import React from 'react';
import PropTypes from 'prop-types';

LegendLabel.propTypes = {
  align: PropTypes.string.isRequired,
  flex: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired
};

export default function LegendLabel({ flex = '1', label, margin, align }) {
  return (
    <div
      className="vx-legend-label"
      style={{
        justifyContent: align,
        display: 'flex',
        flex,
        margin
      }}
    >
      {label}
    </div>
  );
}
