import React from 'react';
import PropTypes from 'prop-types';

ResponsiveSVG.propTypes = {
  children: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xOrigin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yOrigin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  preserveAspectRatio: PropTypes.string
};

export default function ResponsiveSVG({
  children,
  width,
  height,
  xOrigin = 0,
  yOrigin = 0,
  preserveAspectRatio = 'xMinYMin meet'
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        verticalAlign: 'top',
        overflow: 'hidden'
      }}
    >
      <svg
        preserveAspectRatio={preserveAspectRatio}
        viewBox={`${xOrigin} ${yOrigin} ${width} ${height}`}
      >
        {children}
      </svg>
    </div>
  );
}
