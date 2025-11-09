import type { ProjectionProps } from './Projection';
import Projection from './Projection';
import type { GeoPermissibleObjects } from '../types';

/**
 * All props pass through to `<Projection projection="albersUsa" {...props} />`
 */
export default function AlbersUsa<Datum extends GeoPermissibleObjects>(
  props: Omit<ProjectionProps<Datum>, 'projection'>,
) {
  return <Projection<Datum> projection="albersUsa" {...props} />;
}
