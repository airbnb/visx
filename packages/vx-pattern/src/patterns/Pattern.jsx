import React from 'react';
import PropTypes from 'prop-types';

export default function Pattern({ id, width, height, children }) {
  return (
    <defs>
      <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
        {children}
      </pattern>
    </defs>
  );
}

Pattern.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
