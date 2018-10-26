import React from 'react';
import PropTypes from 'prop-types';

LegendItem.propTypes = {
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any
};

export default function LegendItem({
  flexDirection = 'row',
  alignItems = 'center',
  margin = '0',
  display = 'flex',
  children,
  ...restProps
}) {
  return (
    <div
      className="vx-legend-item"
      style={{
        display,
        alignItems,
        flexDirection,
        margin
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
