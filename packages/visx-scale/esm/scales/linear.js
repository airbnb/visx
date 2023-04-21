import { scaleLinear } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateLinearScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round', 'zero');
export default function createLinearScale(config) {
  return updateLinearScale(scaleLinear(), config);
}