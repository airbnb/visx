import React from 'react';
import PropTypes from 'prop-types';

LegendLabel.propTypes = {
  align: PropTypes.string,
  label: PropTypes.any,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any
};

export default function LegendLabel({
  flex = '1',
  label,
  margin = '5px 0',
  align = 'left',
  children
}) {
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
      {children || label}
    </div>
  );
}
