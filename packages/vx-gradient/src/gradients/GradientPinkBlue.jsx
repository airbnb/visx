import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientPinkBlue.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};
/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPinkBlue({ from = '#F02FC2', to = '#6094EA', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
