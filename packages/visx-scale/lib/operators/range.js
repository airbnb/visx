"use strict";

exports.__esModule = true;
exports.default = applyRange;

function applyRange(scale, config) {
  if (config.range) {
    if ('padding' in scale) {
      // point and band scales
      scale.range(config.range);
    } else {
      // the rest
      scale.range(config.range);
    }
  }
}