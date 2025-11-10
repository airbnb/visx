import type { ProjectionProps } from './Projection';
import Projection from './Projection';
import type { GeoPermissibleObjects } from '../types';

/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
export default function CustomProjection<Datum extends GeoPermissibleObjects>(
  props: ProjectionProps<Datum>,
) {
  return <Projection<Datum> {...props} />;
}
