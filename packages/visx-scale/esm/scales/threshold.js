import { scaleThreshold } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateThresholdScale = scaleOperator('domain', 'range', 'reverse');
export default function createThresholdScale(config) {
  return updateThresholdScale(scaleThreshold(), config);
}