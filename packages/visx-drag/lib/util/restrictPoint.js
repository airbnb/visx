"use strict";

exports.__esModule = true;
exports.default = restrictPoint;
var _clampNumber = _interopRequireDefault(require("./clampNumber"));
var _getClosestPoint = _interopRequireDefault(require("./getClosestPoint"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** Restrict a point to an area, or samples along a path. */
function restrictPoint(point, samples, restrict) {
  var _restrict$xMin, _restrict$xMax, _restrict$yMin, _restrict$yMax;
  if (restrict === void 0) {
    restrict = {};
  }
  if (samples.length > 0) {
    return (0, _getClosestPoint.default)(point, samples);
  }
  return {
    x: (0, _clampNumber.default)(point.x, (_restrict$xMin = restrict.xMin) != null ? _restrict$xMin : -Infinity, (_restrict$xMax = restrict.xMax) != null ? _restrict$xMax : Infinity),
    y: (0, _clampNumber.default)(point.y, (_restrict$yMin = restrict.yMin) != null ? _restrict$yMin : -Infinity, (_restrict$yMax = restrict.yMax) != null ? _restrict$yMax : Infinity)
  };
}