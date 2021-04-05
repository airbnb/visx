import { scaleRadial } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateRadialScale = scaleOperator('domain', 'range', 'clamp', 'nice', 'round', 'unknown');
export default function createRadialScale(config) {
  return updateRadialScale(scaleRadial(), config);
}