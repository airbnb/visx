"use strict";

exports.__esModule = true;
exports.default = createPoint;

var _point = require("@visx/point");

function createPoint(_ref, horizontal) {
  var x = _ref.x,
      y = _ref.y;
  return new _point.Point(horizontal ? {
    x: x,
    y: y
  } : {
    x: y,
    y: x
  });
}