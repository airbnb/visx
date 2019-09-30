import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientOrangeRed.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientOrangeRed({ from = '#FCE38A', to = '#F38181', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
