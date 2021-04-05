/// <reference types="react" />
import { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';
import { GridScale } from '@visx/grid/lib/types';
import { AnimationTrajectory } from '../types';
export default function AnimatedGridColumns<Scale extends GridScale>({ scale, height, numTicks, tickValues, offset, className, animationTrajectory, top, left, ...lineProps }: Omit<GridColumnsProps<Scale>, 'children'> & {
    animationTrajectory?: AnimationTrajectory;
}): JSX.Element;
//# sourceMappingURL=AnimatedGridColumns.d.ts.map