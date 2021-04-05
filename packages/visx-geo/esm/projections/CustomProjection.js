import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
export default function CustomProjection(props) {
  return /*#__PURE__*/React.createElement(Projection, props);
}