"use strict";

exports.__esModule = true;
exports.default = getScaleBandwidth;
function getScaleBandwidth(scale) {
  return 'bandwidth' in scale ? scale.bandwidth() : 0;
}