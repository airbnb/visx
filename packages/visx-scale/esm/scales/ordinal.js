import { scaleOrdinal } from 'd3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateOrdinalScale = scaleOperator('domain', 'range', 'reverse', 'unknown');
export default function createOrdinalScale(config) {
  return updateOrdinalScale(scaleOrdinal(), config);
}