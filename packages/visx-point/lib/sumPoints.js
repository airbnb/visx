"use strict";

exports.__esModule = true;
exports.default = sumPoints;
var _Point = _interopRequireDefault(require("./Point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function sumPoints(point1, point2) {
  return new _Point.default({
    x: point1.x + point2.x,
    y: point1.y + point2.y
  });
}