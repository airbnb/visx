/// <reference types="react" />
import { AnimationTrajectory } from '@visx/react-spring';
import { BaseGridProps } from './BaseGrid';
export declare type AnimatedGridProps = Omit<BaseGridProps, 'GridRowsComponent' | 'GridColumnsComponent'> & {
    /** Animation trjectory of grid lines. */
    animationTrajectory?: AnimationTrajectory;
};
export default function AnimatedGrid({ animationTrajectory, ...props }: AnimatedGridProps): JSX.Element;
//# sourceMappingURL=AnimatedGrid.d.ts.map