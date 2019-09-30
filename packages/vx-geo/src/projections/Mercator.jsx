import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
export default function Mercator(props) {
  return <Projection projection="mercator" {...props} />;
}
