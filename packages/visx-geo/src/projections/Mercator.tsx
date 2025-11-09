import type { ProjectionProps } from './Projection';
import Projection from './Projection';
import type { GeoPermissibleObjects } from '../types';

/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
export default function Mercator<Datum extends GeoPermissibleObjects>(
  props: Omit<ProjectionProps<Datum>, 'projection'>,
) {
  return <Projection<Datum> projection="mercator" {...props} />;
}
