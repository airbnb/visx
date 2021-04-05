import { scaleQuantize } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateQuantizeScale = scaleOperator('domain', 'range', 'reverse', 'nice', 'zero');
export default function createQuantizeScale(config) {
  return updateQuantizeScale(scaleQuantize(), config);
}