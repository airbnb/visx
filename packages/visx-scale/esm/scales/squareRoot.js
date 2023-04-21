import { scaleSqrt } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateSqrtScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round', 'zero');
export default function createSqrtScale(config) {
  return updateSqrtScale(scaleSqrt(), config);
}