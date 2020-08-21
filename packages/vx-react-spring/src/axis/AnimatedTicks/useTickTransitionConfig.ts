import { useMemo } from 'react';
import { coerceNumber } from '@vx/scale';
import { AxisScale, ComputedTick, TicksRendererProps } from '@vx/axis/lib/types';

function enterUpdate<Scale extends AxisScale>({ from, to }: ComputedTick<Scale>) {
  return {
    fromX: from.x,
    toX: to.x,
    fromY: from.y,
    toY: to.y,
    opacity: 1,
  };
}

export default function useTickTransitionConfig<Scale extends AxisScale>({
  horizontal,
  scale,
}: Pick<TicksRendererProps<Scale>, 'scale' | 'horizontal'>) {
  return useMemo(() => {
    const [a, b] = scale.range();
    const isDescending = b != null && a != null && b < a;
    const [minPosition, maxPosition] = isDescending ? [b, a] : [a, b];
    const scaleLength = b != null && a != null ? Math.abs(coerceNumber(b) - coerceNumber(a)) : 0;

    const fromLeave = ({ from, to, value }: ComputedTick<Scale>) => {
      const scaledValue = scale(value) ?? 0;

      return {
        fromX: horizontal
          ? // for top/bottom scales, enter from left or right based on value
            scaledValue < scaleLength / 2
            ? minPosition
            : maxPosition
          : // for left/right scales, don't animate x
            from.x,
        // same logic as above for the `to` Point
        toX: horizontal ? (scaledValue < scaleLength / 2 ? minPosition : maxPosition) : to.x,
        // for top/bottom scales, don't animate y
        fromY: horizontal
          ? // for top/bottom scales, don't animate y
            from.y
          : // for left/right scales, animate from top or bottom based on value
          scaledValue < scaleLength / 2
          ? minPosition
          : maxPosition,
        // same logic as above for the `to` Point
        toY: horizontal ? to.y : scaledValue < scaleLength / 2 ? minPosition : maxPosition,
        opacity: 0,
      };
    };

    return { from: fromLeave, leave: fromLeave, enter: enterUpdate, update: enterUpdate };
  }, [horizontal, scale]);
}
