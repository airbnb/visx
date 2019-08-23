import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientTealBlue.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientTealBlue({ from = '#17EAD9', to = '#6078EA', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
