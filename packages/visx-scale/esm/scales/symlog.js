import { scaleSymlog } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateSymlogScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'constant', 'nice', 'zero', 'round');
export default function createSymlogScale(config) {
  return updateSymlogScale(scaleSymlog(), config);
}