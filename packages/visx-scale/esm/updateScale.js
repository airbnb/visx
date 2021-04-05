import scaleOperator, { ALL_OPERATORS } from './operators/scaleOperator';
var applyAllOperators = scaleOperator.apply(void 0, ALL_OPERATORS); // Overload function signature for more strict typing, e.g.,
// If the scale is a ScaleLinear, the config is a linear config.

// Actual implementation
function updateScale(scale, config) {
  return applyAllOperators(scale.copy(), config);
}

export default updateScale;