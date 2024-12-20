import {
  interpolateRgb,
  interpolateLab,
  interpolateHcl,
  interpolateHclLong,
  interpolateHsl,
  interpolateHslLong,
  interpolateCubehelix,
  interpolateCubehelixLong,
} from '@visx/vendor/d3-interpolate';
import type { ScaleInterpolateParams, ScaleInterpolate } from '../types/ScaleInterpolate';

const interpolatorMap = {
  lab: interpolateLab,
  hcl: interpolateHcl,
  'hcl-long': interpolateHclLong,
  hsl: interpolateHsl,
  'hsl-long': interpolateHslLong,
  cubehelix: interpolateCubehelix,
  'cubehelix-long': interpolateCubehelixLong,
  rgb: interpolateRgb,
} as const;

export default function createColorInterpolator(
  interpolate: ScaleInterpolate | ScaleInterpolateParams,
) {
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

  const { type, gamma } = interpolate;
  const interpolator = interpolatorMap[type];
  return typeof gamma === 'undefined' ? interpolator : interpolator.gamma(gamma);
}
