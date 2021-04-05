import React from 'react';
import { AxisScale } from '@visx/axis';
import { AxisProps as VxAxisProps } from '@visx/axis/lib/axis/Axis';
export declare type BaseAxisProps<Scale extends AxisScale> = Omit<VxAxisProps<Scale>, 'scale' | 'orientation'> & {
    /** Required axis orientation. */
    orientation: NonNullable<VxAxisProps<Scale>['orientation']>;
} & {
    /** Rendered component which is passed VxAxisProps by BaseAxis after processing. */
    AxisComponent: React.FC<VxAxisProps<Scale>>;
};
/**
 * Component which handles all xychart-specific logic for axes,
 * and passes processed props to a specified Axis / AnimatedAxis component.
 */
export default function BaseAxis<Scale extends AxisScale>({ AxisComponent, ...props }: BaseAxisProps<Scale>): JSX.Element | null;
//# sourceMappingURL=BaseAxis.d.ts.map