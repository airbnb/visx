"use strict";

exports.__esModule = true;
exports.default = polarToCartesian;

function polarToCartesian(_ref) {
  var radius = _ref.radius,
      angle = _ref.angle;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}