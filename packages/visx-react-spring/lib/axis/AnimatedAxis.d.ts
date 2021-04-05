/// <reference types="react" />
import { AxisProps } from '@visx/axis/lib/axis/Axis';
import { AxisScale } from '@visx/axis/lib/types';
import { AnimationTrajectory } from '../types';
export declare type AnimatedAxisProps<Scale extends AxisScale> = Omit<AxisProps<Scale>, 'ticksComponent'> & {
    animationTrajectory?: AnimationTrajectory;
};
export default function AnimatedAxis<Scale extends AxisScale>({ animationTrajectory, ...axisProps }: AnimatedAxisProps<Scale>): JSX.Element;
//# sourceMappingURL=AnimatedAxis.d.ts.map