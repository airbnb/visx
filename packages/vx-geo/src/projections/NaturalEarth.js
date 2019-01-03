import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="naturalEarth" {...props} />`
 */
export default function NaturalEarth(props) {
  return <Projection projection="naturalEarth" {...props} />;
}
