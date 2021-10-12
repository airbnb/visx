import { PositionScale } from '@visx/shape/lib/types';
import { ScaleTypeToD3Scale } from '@visx/scale';
import { NearestDatumArgs } from '../types';
import findNearestDatumX from './findNearestDatumX';
import findNearestDatumY from './findNearestDatumY';

/**
 * This is a wrapper around findNearestDatumX/Y for BarGroup, accounting for a
 * Bar's group scale offset (which findNearestDatum does not).
 */
export default function findNearestGroupDatum<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(
  nearestDatumArgs: NearestDatumArgs<XScale, YScale, Datum>,
  groupScale: ScaleTypeToD3Scale<string, string>['band'],
  horizontal?: boolean,
) {
  const { dataKey, xAccessor, yAccessor, xScale, yScale, point } = nearestDatumArgs;
  const datum = (horizontal ? findNearestDatumY : findNearestDatumX)(nearestDatumArgs);

  if (!datum || !point) return null;

  const barGroupOffset = groupScale(dataKey);
  const barWidth = groupScale.step();

  if (horizontal) {
    const groupPosition = yScale(yAccessor(datum.datum));
    const barStart = (groupPosition ?? Infinity) + (barGroupOffset ?? Infinity);
    const barEnd = barStart + barWidth;
    const barMiddle = (barStart + barEnd) / 2;
    const cursorIsOnBar = point.y >= barStart && point.y <= barEnd;
    return {
      ...datum,
      distanceX: 0, // we want all group bars to have same X distance so only Y distance matters
      distanceY: cursorIsOnBar ? 0 : Math.abs(point.y - barMiddle),
    };
  }
  const groupPosition = xScale(xAccessor(datum.datum));
  const barStart = (groupPosition ?? Infinity) + (barGroupOffset ?? Infinity);
  const barEnd = barStart + barWidth;
  const barMiddle = (barStart + barEnd) / 2;
  const cursorIsOnBar = point.x >= barStart && point.x <= barEnd;
  return {
    ...datum,
    distanceY: 0, // we want all group bars to have same Y distance so only X distance matters
    distanceX: cursorIsOnBar ? 0 : Math.abs(point.x - barMiddle),
  };
}
