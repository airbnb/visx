import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="albers" {...props} />`
 */
export default function Albers(props) {
  return <Projection projection="albers" {...props} />;
}
