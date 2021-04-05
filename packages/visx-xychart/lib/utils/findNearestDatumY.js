"use strict";

exports.__esModule = true;
exports.default = findNearestDatumY;

var _findNearestDatumSingleDimension = _interopRequireDefault(require("./findNearestDatumSingleDimension"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findNearestDatumY(_ref) {
  var scale = _ref.yScale,
      accessor = _ref.yAccessor,
      xScale = _ref.xScale,
      xAccessor = _ref.xAccessor,
      point = _ref.point,
      data = _ref.data;
  if (!point) return null;
  var nearestDatum = (0, _findNearestDatumSingleDimension.default)({
    scale: scale,
    accessor: accessor,
    scaledValue: point.y,
    data: data
  });
  return nearestDatum ? {
    datum: nearestDatum.datum,
    index: nearestDatum.index,
    distanceY: nearestDatum.distance,
    distanceX: Math.abs(Number(xScale(xAccessor(nearestDatum.datum))) - point.x)
  } : null;
}