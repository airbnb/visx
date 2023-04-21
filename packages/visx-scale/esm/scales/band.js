import { scaleBand } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateBandScale = scaleOperator('domain', 'range', 'reverse', 'align', 'padding', 'round');
export default function createBandScale(config) {
  return updateBandScale(scaleBand(), config);
}