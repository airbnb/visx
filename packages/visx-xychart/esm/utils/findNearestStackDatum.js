import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import findNearestDatumY from './findNearestDatumY';
import findNearestDatumX from './findNearestDatumX';

/**
 * This is a wrapper around findNearestDatumX/Y for BarStack, accounting for a
 * Bar's d0 and d1, not just d1 (which findNearestDatum uses). Additionally,
 * returns the BarSeries original `Datum`, not the `BarStackDatum` so
 * Tooltip typing is correct.
 */
export default function findNearestStackDatum(nearestDatumArgs, seriesData, horizontal) {
  var _xScale, _xScale2, _yScale, _yScale2;

  var xScale = nearestDatumArgs.xScale,
      yScale = nearestDatumArgs.yScale,
      point = nearestDatumArgs.point;
  var datum = (horizontal ? findNearestDatumY : findNearestDatumX)(nearestDatumArgs);
  var seriesDatum = (datum == null ? void 0 : datum.index) == null ? null : seriesData[datum.index];
  return datum && seriesDatum && point ? {
    index: datum.index,
    datum: seriesDatum,
    distanceX: horizontal // if mouse is ON the stack series, set 0 distance
    ? point.x >= ((_xScale = xScale(getFirstItem(datum.datum))) != null ? _xScale : Infinity) && point.x <= ((_xScale2 = xScale(getSecondItem(datum.datum))) != null ? _xScale2 : -Infinity) ? 0 : datum.distanceX : datum.distanceX,
    distanceY: horizontal ? datum.distanceY // if mouse is ON the stack series, set 0 distance
    : point.y <= ((_yScale = yScale(getFirstItem(datum.datum))) != null ? _yScale : -Infinity) && point.y >= ((_yScale2 = yScale(getSecondItem(datum.datum))) != null ? _yScale2 : Infinity) ? 0 : datum.distanceY
  } : null;
}