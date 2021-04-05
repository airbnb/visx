/// <reference types="react" />
import { ProjectionProps } from './Projection';
import { GeoPermissibleObjects } from '../types';
/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
export default function CustomProjection<Datum extends GeoPermissibleObjects>(props: ProjectionProps<Datum>): JSX.Element;
//# sourceMappingURL=CustomProjection.d.ts.map