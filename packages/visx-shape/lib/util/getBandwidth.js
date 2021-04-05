"use strict";

exports.__esModule = true;
exports.default = getBandwidth;

function getBandwidth(scale) {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  var range = scale.range();
  var domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
}