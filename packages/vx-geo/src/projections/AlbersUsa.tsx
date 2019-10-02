import React from 'react';
import Projection, { ProjectionProps, GeoPermissibleObjects } from './Projection';

/**
 * All props pass through to `<Projection projection="albersUsa" {...props} />`
 */
export default function AlbersUsa<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> projection="albersUsa" {...props} />;
}
