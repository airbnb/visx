import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientPurpleOrange.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};
/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleOrange({ from = '#7117EA', to = '#EA6060', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
