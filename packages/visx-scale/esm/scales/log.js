import { scaleLog } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateLogScale = scaleOperator('domain', 'range', 'reverse', 'base', 'clamp', 'interpolate', 'nice', 'round');
export default function createLogScale(config) {
  return updateLogScale(scaleLog(), config);
}