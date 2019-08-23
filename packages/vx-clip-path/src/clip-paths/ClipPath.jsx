import React from 'react';
import PropTypes from 'prop-types';

ClipPath.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default function ClipPath({ id, children, ...restProps }) {
  return (
    <defs>
      <clipPath id={id} {...restProps}>
        {children}
      </clipPath>
    </defs>
  );
}
