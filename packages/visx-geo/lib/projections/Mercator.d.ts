/// <reference types="react" />
import { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';
/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
export default function Mercator<Datum extends GeoPermissibleObjects>(props: Omit<ProjectionProps<Datum>, 'projection'>): JSX.Element;
//# sourceMappingURL=Mercator.d.ts.map