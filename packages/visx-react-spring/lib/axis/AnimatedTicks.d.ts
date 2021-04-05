/// <reference types="react" />
import { TicksRendererProps, AxisScale } from '@visx/axis/lib/types';
import { AnimationTrajectory } from '../types';
export default function AnimatedTicks<Scale extends AxisScale>({ hideTicks, horizontal, orientation, scale, tickClassName, tickLabelProps: allTickLabelProps, tickStroke, tickTransform, ticks, animationTrajectory, }: TicksRendererProps<Scale> & {
    animationTrajectory?: AnimationTrajectory;
}): JSX.Element;
//# sourceMappingURL=AnimatedTicks.d.ts.map