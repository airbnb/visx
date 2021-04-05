"use strict";

exports.__esModule = true;
exports.default = scaleCanBeZeroed;
var zeroableScaleTypes = new Set(['linear', 'pow', 'quantize', 'sqrt', 'symlog']);

function scaleCanBeZeroed(scaleConfig) {
  return zeroableScaleTypes.has(scaleConfig.type);
}