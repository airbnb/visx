"use strict";

exports.__esModule = true;
exports.default = scaleOperator;
exports.ALL_OPERATORS = void 0;

var _domain = _interopRequireDefault(require("./domain"));

var _range = _interopRequireDefault(require("./range"));

var _align = _interopRequireDefault(require("./align"));

var _base = _interopRequireDefault(require("./base"));

var _clamp = _interopRequireDefault(require("./clamp"));

var _constant = _interopRequireDefault(require("./constant"));

var _exponent = _interopRequireDefault(require("./exponent"));

var _interpolate = _interopRequireDefault(require("./interpolate"));

var _nice = _interopRequireDefault(require("./nice"));

var _padding = _interopRequireDefault(require("./padding"));

var _reverse = _interopRequireDefault(require("./reverse"));

var _round = _interopRequireDefault(require("./round"));

var _unknown = _interopRequireDefault(require("./unknown"));

var _zero = _interopRequireDefault(require("./zero"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of all operators, in order of execution
 */
var ALL_OPERATORS = [// domain => nice => zero
'domain', 'nice', 'zero', // interpolate before round
'interpolate', 'round', // set range then reverse
'range', 'reverse', // Order does not matter for these operators
'align', 'base', 'clamp', 'constant', 'exponent', 'padding', 'unknown'];
exports.ALL_OPERATORS = ALL_OPERATORS;
// Use Record to enforce that all keys in OperatorType must exist.
var operators = {
  domain: _domain.default,
  nice: _nice.default,
  zero: _zero.default,
  interpolate: _interpolate.default,
  round: _round.default,
  align: _align.default,
  base: _base.default,
  clamp: _clamp.default,
  constant: _constant.default,
  exponent: _exponent.default,
  padding: _padding.default,
  range: _range.default,
  reverse: _reverse.default,
  unknown: _unknown.default
};

function scaleOperator() {
  for (var _len = arguments.length, ops = new Array(_len), _key = 0; _key < _len; _key++) {
    ops[_key] = arguments[_key];
  }

  var selection = new Set(ops);
  var selectedOps = ALL_OPERATORS.filter(function (o) {
    return selection.has(o);
  });
  return function applyOperators(scale, config) {
    if (typeof config !== 'undefined') {
      selectedOps.forEach(function (op) {
        operators[op](scale, config);
      });
    }

    return scale;
  };
}