import React from 'react';
import Projection, { ProjectionProps, GeoPermissibleObjects } from './Projection';

/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
export default function CustomProjection<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> {...props} />;
}
