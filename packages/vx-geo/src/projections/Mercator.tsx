import React from 'react';
import Projection, { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';

/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
export default function Mercator<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> projection="mercator" {...props} />;
}
