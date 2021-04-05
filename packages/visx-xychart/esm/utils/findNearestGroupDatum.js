function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import findNearestDatumX from './findNearestDatumX';
import findNearestDatumY from './findNearestDatumY';
/**
 * This is a wrapper around findNearestDatumX/Y for BarGroup, accounting for a
 * Bar's group scale offset (which findNearestDatum does not).
 */

export default function findNearestGroupDatum(nearestDatumArgs, groupScale, horizontal) {
  var dataKey = nearestDatumArgs.dataKey,
      xAccessor = nearestDatumArgs.xAccessor,
      yAccessor = nearestDatumArgs.yAccessor,
      xScale = nearestDatumArgs.xScale,
      yScale = nearestDatumArgs.yScale,
      point = nearestDatumArgs.point;
  var datum = (horizontal ? findNearestDatumY : findNearestDatumX)(nearestDatumArgs);
  if (!datum || !point) return null;
  var barGroupOffset = groupScale(dataKey);
  var barWidth = groupScale.step();

  if (horizontal) {
    var _groupPosition = yScale(yAccessor(datum.datum));

    var _barStart = (_groupPosition != null ? _groupPosition : Infinity) + (barGroupOffset != null ? barGroupOffset : Infinity);

    var _barEnd = _barStart + barWidth;

    var _barMiddle = (_barStart + _barEnd) / 2;

    var _cursorIsOnBar = point.y >= _barStart && point.y <= _barEnd;

    return _extends({}, datum, {
      distanceX: 0,
      // we want all group bars to have same X distance so only Y distance matters
      distanceY: _cursorIsOnBar ? 0 : Math.abs(point.y - _barMiddle)
    });
  }

  var groupPosition = xScale(xAccessor(datum.datum));
  var barStart = (groupPosition != null ? groupPosition : Infinity) + (barGroupOffset != null ? barGroupOffset : Infinity);
  var barEnd = barStart + barWidth;
  var barMiddle = (barStart + barEnd) / 2;
  var cursorIsOnBar = point.x >= barStart && point.x <= barEnd;
  return _extends({}, datum, {
    distanceY: 0,
    // we want all group bars to have same Y distance so only X distance matters
    distanceX: cursorIsOnBar ? 0 : Math.abs(point.x - barMiddle)
  });
}