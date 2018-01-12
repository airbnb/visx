import React from 'react';
import PropTypes from 'prop-types';
import additonalProps from '../util/additionalProps';

LegendItem.propTypes = {
  flexDirection: PropTypes.string,
  margin: PropTypes.string,
  label: PropTypes.object.isRequired,
};

export default function LegendItem({
  children,
  flexDirection,
  margin,
  label,
  ...restProps
}) {
  return (
    <div
      className="vx-legend-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection,
        margin,
      }}
      {...additonalProps(restProps, label)}
    >
      {children}
    </div>
  );
}
