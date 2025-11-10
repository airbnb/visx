import type { ReactElement } from 'react';
import type { AxisScale } from '@visx/axis';
import type { CombinedStackData, SeriesProps } from '../types';

/** Returns the value which forms a stack group. */
export const getStackValue = <XScale extends AxisScale, YScale extends AxisScale>(
  d: Pick<CombinedStackData<XScale, YScale>, 'stack'>,
) => d.stack;

/**
 * Merges `seriesChildren` `props.data` by their `stack` value which
 * forms the stack grouping (`x` if vertical, `y` if horizontal)
 * and returns `CombinedStackData[]`.
 */
export default function combineBarStackData<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(
  seriesChildren: ReactElement<SeriesProps<XScale, YScale, Datum>>[],
  horizontal?: boolean,
): CombinedStackData<XScale, YScale>[] {
  const dataByStackValue = new Map<string, CombinedStackData<XScale, YScale>>();

  seriesChildren.forEach((child) => {
    const { dataKey, data, xAccessor, yAccessor } = child.props;

    // this should exist but double check
    if (!xAccessor || !yAccessor) return;

    const [stackFn, valueFn] = horizontal ? [yAccessor, xAccessor] : [xAccessor, yAccessor];

    data.forEach((d) => {
      const stack = stackFn(d);
      const numericValue = valueFn(d);
      const stackKey = String(stack);
      if (!dataByStackValue.has(stackKey)) {
        dataByStackValue.set(stackKey, {
          stack,
          positiveSum: 0,
          negativeSum: 0,
        });
      }
      const stackEntry = dataByStackValue.get(stackKey)!;
      stackEntry[dataKey] = numericValue;
      stackEntry[numericValue >= 0 ? 'positiveSum' : 'negativeSum'] += numericValue;
    });
  });

  return Array.from(dataByStackValue.values());
}
