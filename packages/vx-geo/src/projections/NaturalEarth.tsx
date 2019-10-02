import React from 'react';
import Projection, { ProjectionProps, GeoPermissibleObjects } from './Projection';

/**
 * All props pass through to `<Projection projection="naturalEarth" {...props} />`
 */
// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function NaturalEarth<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> projection="naturalEarth" {...props} />;
}
