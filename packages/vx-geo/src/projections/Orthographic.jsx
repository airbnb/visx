import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="orthographic" {...props} />`
 */
export default function Orthographic(props) {
  return <Projection projection="orthographic" {...props} />;
}
