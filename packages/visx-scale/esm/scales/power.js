import { scalePow } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updatePowScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'exponent', 'interpolate', 'nice', 'round', 'zero');
export default function createPowScale(config) {
  return updatePowScale(scalePow(), config);
}