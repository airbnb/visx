import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="equalEarth" {...props} />`
 */
export default function EqualEarth(props) {
  return <Projection projection="equalEarth" {...props} />;
}
