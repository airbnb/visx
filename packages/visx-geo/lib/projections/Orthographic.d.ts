/// <reference types="react" />
import { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';
/**
 * All props pass through to `<Projection projection="orthographic" {...props} />`
 */
export default function Orthographic<Datum extends GeoPermissibleObjects>(props: Omit<ProjectionProps<Datum>, 'projection'>): JSX.Element;
//# sourceMappingURL=Orthographic.d.ts.map