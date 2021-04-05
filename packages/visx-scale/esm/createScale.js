import createLinearScale from './scales/linear';
import createLogScale from './scales/log';
import createPowScale from './scales/power';
import createSqrtScale from './scales/squareRoot';
import createSymlogScale from './scales/symlog';
import createTimeScale from './scales/time';
import createUtcScale from './scales/utc';
import createQuantileScale from './scales/quantile';
import createQuantizeScale from './scales/quantize';
import createThresholdScale from './scales/threshold';
import createOrdinalScale from './scales/ordinal';
import createPointScale from './scales/point';
import createBandScale from './scales/band'; // Overload function for more strict typing, e.g.,
// If the config is a linear config then a ScaleLinear will be returned
// instead of a union type of all scales.

// Actual implementation
function createScale(config) {
  if (typeof config !== 'undefined' && 'type' in config) {
    switch (config.type) {
      case 'linear':
        return createLinearScale(config);

      case 'log':
        return createLogScale(config);

      case 'pow':
        return createPowScale(config);

      case 'sqrt':
        return createSqrtScale(config);

      case 'symlog':
        return createSymlogScale(config);

      case 'time':
        return createTimeScale(config);

      case 'utc':
        return createUtcScale(config);

      case 'quantile':
        return createQuantileScale(config);

      case 'quantize':
        return createQuantizeScale(config);

      case 'threshold':
        return createThresholdScale(config);

      case 'ordinal':
        return createOrdinalScale(config);

      case 'point':
        return createPointScale(config);

      case 'band':
        return createBandScale(config);

      default:
    }
  } // If type is not specified, fallback to linear scale


  return createLinearScale(config);
}

export default createScale;