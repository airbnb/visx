import React from 'react';
import { AxisScale } from '@visx/axis';
import { CombinedStackData, DataRegistryEntry, SeriesProps } from '../types';

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
  stackedSeries: DataRegistryEntry<XScale, YScale, Datum>[],
  horizontal?: boolean,
): CombinedStackData<XScale, YScale>[] {
  const dataByStackValue: {
    [stackValue: string]: CombinedStackData<XScale, YScale>;
  } = {};

  stackedSeries.forEach((series) => {
    const { key, data, xAccessor, yAccessor } = series;

    // this should exist but double check
    if (!xAccessor || !yAccessor) return;

    const [stackFn, valueFn] = horizontal ? [yAccessor, xAccessor] : [xAccessor, yAccessor];

    data.forEach((d) => {
      const stack = stackFn(d);
      const numericValue = valueFn(d);
      const stackKey = String(stack);
      if (!dataByStackValue[stackKey]) {
        dataByStackValue[stackKey] = { stack, positiveSum: 0, negativeSum: 0 };
      }
      dataByStackValue[stackKey][key] = numericValue;
      dataByStackValue[stackKey][numericValue >= 0 ? 'positiveSum' : 'negativeSum'] += numericValue;
    });
  });

  return Object.values(dataByStackValue);
}
