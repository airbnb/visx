"use strict";

exports.__esModule = true;
exports.default = void 0;
var _scaleOperator = _interopRequireWildcard(require("./operators/scaleOperator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */

var applyAllOperators = _scaleOperator.default.apply(void 0, _scaleOperator.ALL_OPERATORS);

// Overload function signature for more strict typing, e.g.,
// If the scale is a ScaleLinear, the config is a linear config.

// Actual implementation

function updateScale(scale, config) {
  return applyAllOperators(scale.copy(), config);
}
var _default = updateScale;
exports.default = _default;