import React from 'react';
import Projection from './Projection';

/**
 * All props pass through to `<Projection projection="albersUsa" {...props} />`
 */
export default function AlbersUsa(props) {
  return <Projection projection="albersUsa" {...props} />;
}
