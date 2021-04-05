/// <reference types="react" />
import { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';
/**
 * All props pass through to `<Projection projection="albersUsa" {...props} />`
 */
export default function AlbersUsa<Datum extends GeoPermissibleObjects>(props: Omit<ProjectionProps<Datum>, 'projection'>): JSX.Element;
//# sourceMappingURL=AlbersUsa.d.ts.map