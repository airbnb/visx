import { AxisScale } from '@visx/axis';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import { ScaleInput } from '@visx/scale';
import findNearestDatumY from './findNearestDatumY';
import findNearestDatumX from './findNearestDatumX';
import { BarStackDatum, NearestDatumArgs } from '../types';

/**
 * This is a wrapper around findNearestDatumX/Y for BarStack, accounting for a
 * Bar's d0 and d1, not just d1 (which findNearestDatum uses). Additionally,
 * returns the BarSeries original `Datum`, not the `BarStackDatum` so
 * Tooltip typing is correct.
 */
export default function findNearestStackDatum<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(
  nearestDatumArgs: NearestDatumArgs<XScale, YScale, BarStackDatum<XScale, YScale>>,
  seriesData: Datum[],
  childAccessors: {
    xAccessor: (d: Datum) => ScaleInput<XScale>;
    yAccessor: (d: Datum) => ScaleInput<YScale>;
  },
  horizontal?: boolean,
) {
  const { xScale, yScale, point } = nearestDatumArgs;
  const datum = (horizontal ? findNearestDatumY : findNearestDatumX)(nearestDatumArgs);
  const stack = datum?.datum.data.stack;
  const seriesDatum = seriesData.find((d) => {
    const { yAccessor, xAccessor } = childAccessors;
    return (horizontal ? yAccessor : xAccessor)(d) === stack;
  });

  return datum && seriesDatum && point
    ? {
        index: datum.index,
        datum: seriesDatum,
        distanceX: horizontal // if mouse is ON the stack series, set 0 distance
          ? point.x >= (xScale(getFirstItem(datum.datum)) ?? Infinity) &&
            point.x <= (xScale(getSecondItem(datum.datum)) ?? -Infinity)
            ? 0
            : datum.distanceX
          : datum.distanceX,
        distanceY: horizontal
          ? datum.distanceY // if mouse is ON the stack series, set 0 distance
          : point.y <= (yScale(getFirstItem(datum.datum)) ?? -Infinity) &&
            point.y >= (yScale(getSecondItem(datum.datum)) ?? Infinity)
          ? 0
          : datum.distanceY,
      }
    : null;
}
