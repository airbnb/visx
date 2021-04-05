import { scaleQuantile } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateQuantileScale = scaleOperator('domain', 'range', 'reverse');
export default function createQuantileScale(config) {
  return updateQuantileScale(scaleQuantile(), config);
}