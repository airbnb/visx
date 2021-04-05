/// <reference types="react" />
import { AxisScale } from '@visx/axis/lib/types';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { BaseAxisProps } from './BaseAxis';
export declare type AnimatedAxisProps<Scale extends AxisScale> = Omit<BaseAxisProps<Scale>, 'AxisComponent'> & {
    /** Animation trjectory of axis ticks. */
    animationTrajectory?: AnimationTrajectory;
};
export default function AnimatedAxis<Scale extends AxisScale>(props: AnimatedAxisProps<Scale>): JSX.Element;
//# sourceMappingURL=AnimatedAxis.d.ts.map