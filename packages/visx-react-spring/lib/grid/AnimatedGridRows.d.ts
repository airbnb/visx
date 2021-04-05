/// <reference types="react" />
import { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridScale } from '@visx/grid/lib/types';
import { AnimationTrajectory } from '../types';
export default function AnimatedGridRows<Scale extends GridScale>({ scale, width, numTicks, tickValues, offset, className, animationTrajectory, top, left, ...lineProps }: Omit<GridRowsProps<Scale>, 'children'> & {
    animationTrajectory?: AnimationTrajectory;
}): JSX.Element;
//# sourceMappingURL=AnimatedGridRows.d.ts.map