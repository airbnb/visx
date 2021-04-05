"use strict";

exports.__esModule = true;
exports.default = getScaleBaseline;

var _scale = require("@visx/scale");

var _isValidNumber = _interopRequireDefault(require("../typeguards/isValidNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the output value of a scale's baseline value, which is either zero
 * or the minimum scale value if its domain doesn't include zero.
 */
function getScaleBaseline(scale) {
  var _scale$range$map = scale.range().map(function (rangeBoundary) {
    var _coerceNumber;

    return (_coerceNumber = (0, _scale.coerceNumber)(rangeBoundary)) != null ? _coerceNumber : 0;
  }),
      a = _scale$range$map[0],
      b = _scale$range$map[1];

  var isDescending = a != null && b != null && b < a;
  var maybeScaleZero = scale(0);

  var _ref = isDescending ? [b, a] : [a, b],
      minOutput = _ref[0],
      maxOutput = _ref[1]; // if maybeScaleZero _is_ a number, but the scale is not clamped and it's outside the domain
  // fallback to the scale's minimum


  return isDescending ? (0, _isValidNumber.default)(maybeScaleZero) ? Math.min(Math.max(minOutput, maybeScaleZero), maxOutput) : maxOutput : (0, _isValidNumber.default)(maybeScaleZero) ? Math.max(maybeScaleZero, minOutput) : minOutput;
}