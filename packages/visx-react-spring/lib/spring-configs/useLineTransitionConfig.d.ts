import { AxisScale } from '@visx/axis/lib/types';
import { GridScale } from '@visx/grid/lib/types';
import { AnimationTrajectory } from '../types';
interface Point {
    x?: number;
    y?: number;
}
interface Line {
    from: Point;
    to: Point;
}
declare function enterUpdate({ from, to }: Line): {
    fromX: number | undefined;
    toX: number | undefined;
    fromY: number | undefined;
    toY: number | undefined;
    opacity: number;
};
export declare type TransitionConfig<Scale extends AxisScale | GridScale> = {
    /** Scale along which animation occurs. */
    scale: Scale;
    /** Whether to animate the `x` or `y` values of a Line. */
    animateXOrY: 'x' | 'y';
    /** The scale position entering lines come from, and exiting lines leave to. */
    animationTrajectory?: AnimationTrajectory;
};
/**
 * A hook that returns `react-spring` transition config for animating a Line
 * horizontally, vertically, and from a specific starting point.
 */
export default function useLineTransitionConfig<Scale extends AxisScale | GridScale>({ scale, animateXOrY, animationTrajectory: initAnimationTrajectory, }: TransitionConfig<Scale>): {
    unique: boolean;
    from: ({ from, to }: Line) => {
        fromX: number | undefined;
        toX: number | undefined;
        fromY: number | undefined;
        toY: number | undefined;
        opacity: number;
    };
    leave: ({ from, to }: Line) => {
        fromX: number | undefined;
        toX: number | undefined;
        fromY: number | undefined;
        toY: number | undefined;
        opacity: number;
    };
    enter: typeof enterUpdate;
    update: typeof enterUpdate;
};
export {};
//# sourceMappingURL=useLineTransitionConfig.d.ts.map