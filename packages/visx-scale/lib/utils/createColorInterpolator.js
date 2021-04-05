"use strict";

exports.__esModule = true;
exports.default = createColorInterpolator;

var _d3Interpolate = require("d3-interpolate");

var interpolatorMap = {
  lab: _d3Interpolate.interpolateLab,
  hcl: _d3Interpolate.interpolateHcl,
  'hcl-long': _d3Interpolate.interpolateHclLong,
  hsl: _d3Interpolate.interpolateHsl,
  'hsl-long': _d3Interpolate.interpolateHslLong,
  cubehelix: _d3Interpolate.interpolateCubehelix,
  'cubehelix-long': _d3Interpolate.interpolateCubehelixLong,
  rgb: _d3Interpolate.interpolateRgb
};

function createColorInterpolator(interpolate) {
  switch (interpolate) {
    case 'lab':
    case 'hcl':
    case 'hcl-long':
    case 'hsl':
    case 'hsl-long':
    case 'cubehelix':
    case 'cubehelix-long':
    case 'rgb':
      return interpolatorMap[interpolate];

    default:
  }

  var type = interpolate.type,
      gamma = interpolate.gamma;
  var interpolator = interpolatorMap[type];
  return typeof gamma === 'undefined' ? interpolator : interpolator.gamma(gamma);
}