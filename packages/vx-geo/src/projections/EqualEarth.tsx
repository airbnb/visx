import React from 'react';
import Projection, { ProjectionProps, GeoPermissibleObjects } from './Projection';

/**
 * All props pass through to `<Projection projection="equalEarth" {...props} />`
 */
// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function EqualEarth<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> projection="equalEarth" {...props} />;
}
