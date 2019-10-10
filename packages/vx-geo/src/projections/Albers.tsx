import React from 'react';
import Projection, { ProjectionProps, GeoPermissibleObjects } from './Projection';

/**
 * All props pass through to `<Projection projection="albers" {...props} />`
 */
export default function Albers<Datum extends GeoPermissibleObjects>(props: ProjectionProps<Datum>) {
  return <Projection<Datum> projection="albers" {...props} />;
}
