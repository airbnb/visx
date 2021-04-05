/// <reference types="react" />
import { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';
/**
 * All props pass through to `<Projection projection="albers" {...props} />`
 */
export default function Albers<Datum extends GeoPermissibleObjects>(props: Omit<ProjectionProps<Datum>, 'projection'>): JSX.Element;
//# sourceMappingURL=Albers.d.ts.map