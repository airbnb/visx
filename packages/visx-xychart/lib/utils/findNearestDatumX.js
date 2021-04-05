"use strict";

exports.__esModule = true;
exports.default = findNearestDatumX;

var _findNearestDatumSingleDimension = _interopRequireDefault(require("./findNearestDatumSingleDimension"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findNearestDatumX(_ref) {
  var scale = _ref.xScale,
      accessor = _ref.xAccessor,
      yScale = _ref.yScale,
      yAccessor = _ref.yAccessor,
      point = _ref.point,
      data = _ref.data;
  if (!point) return null;
  var nearestDatum = (0, _findNearestDatumSingleDimension.default)({
    scale: scale,
    accessor: accessor,
    scaledValue: point.x,
    data: data
  });
  return nearestDatum ? {
    datum: nearestDatum.datum,
    index: nearestDatum.index,
    distanceX: nearestDatum.distance,
    distanceY: Math.abs(Number(yScale(yAccessor(nearestDatum.datum))) - point.y)
  } : null;
}