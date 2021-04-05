"use strict";

exports.__esModule = true;
exports.default = findNearestStackDatum;

var _accessors = require("@visx/shape/lib/util/accessors");

var _findNearestDatumY = _interopRequireDefault(require("./findNearestDatumY"));

var _findNearestDatumX = _interopRequireDefault(require("./findNearestDatumX"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a wrapper around findNearestDatumX/Y for BarStack, accounting for a
 * Bar's d0 and d1, not just d1 (which findNearestDatum uses). Additionally,
 * returns the BarSeries original `Datum`, not the `BarStackDatum` so
 * Tooltip typing is correct.
 */
function findNearestStackDatum(nearestDatumArgs, seriesData, horizontal) {
  var _xScale, _xScale2, _yScale, _yScale2;

  var xScale = nearestDatumArgs.xScale,
      yScale = nearestDatumArgs.yScale,
      point = nearestDatumArgs.point;
  var datum = (horizontal ? _findNearestDatumY.default : _findNearestDatumX.default)(nearestDatumArgs);
  var seriesDatum = (datum == null ? void 0 : datum.index) == null ? null : seriesData[datum.index];
  return datum && seriesDatum && point ? {
    index: datum.index,
    datum: seriesDatum,
    distanceX: horizontal // if mouse is ON the stack series, set 0 distance
    ? point.x >= ((_xScale = xScale((0, _accessors.getFirstItem)(datum.datum))) != null ? _xScale : Infinity) && point.x <= ((_xScale2 = xScale((0, _accessors.getSecondItem)(datum.datum))) != null ? _xScale2 : -Infinity) ? 0 : datum.distanceX : datum.distanceX,
    distanceY: horizontal ? datum.distanceY // if mouse is ON the stack series, set 0 distance
    : point.y <= ((_yScale = yScale((0, _accessors.getFirstItem)(datum.datum))) != null ? _yScale : -Infinity) && point.y >= ((_yScale2 = yScale((0, _accessors.getSecondItem)(datum.datum))) != null ? _yScale2 : Infinity) ? 0 : datum.distanceY
  } : null;
}