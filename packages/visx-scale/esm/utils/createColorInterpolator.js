import { interpolateRgb, interpolateLab, interpolateHcl, interpolateHclLong, interpolateHsl, interpolateHslLong, interpolateCubehelix, interpolateCubehelixLong } from 'd3-interpolate';
var interpolatorMap = {
  lab: interpolateLab,
  hcl: interpolateHcl,
  'hcl-long': interpolateHclLong,
  hsl: interpolateHsl,
  'hsl-long': interpolateHslLong,
  cubehelix: interpolateCubehelix,
  'cubehelix-long': interpolateCubehelixLong,
  rgb: interpolateRgb
};
export default function createColorInterpolator(interpolate) {
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