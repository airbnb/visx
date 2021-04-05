import { interpolateRound } from 'd3-interpolate';
export default function applyRound(scale, config) {
  if ('round' in config && typeof config.round !== 'undefined') {
    if (config.round && 'interpolate' in config && typeof config.interpolate !== 'undefined') {
      console.warn("[visx/scale/applyRound] ignoring round: scale config contains round and interpolate. only applying interpolate. config:", config);
    } else if ('round' in scale) {
      // for point and band scales
      scale.round(config.round);
    } else if ('interpolate' in scale && config.round) {
      // for continuous output scales
      // setting config.round = true
      // is actually setting interpolator to interpolateRound
      // as these scales do not have scale.round() function
      scale.interpolate(interpolateRound);
    }
  }
}