import { scalePoint } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updatePointScale = scaleOperator('domain', 'range', 'reverse', 'align', 'padding', 'round');
export default function createPointScale(config) {
  return updatePointScale(scalePoint(), config);
}