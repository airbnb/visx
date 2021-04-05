import domain from './domain';
import range from './range';
import align from './align';
import base from './base';
import clamp from './clamp';
import constant from './constant';
import exponent from './exponent';
import interpolate from './interpolate';
import nice from './nice';
import padding from './padding';
import reverse from './reverse';
import round from './round';
import unknown from './unknown';
import zero from './zero';
/**
 * List of all operators, in order of execution
 */

export var ALL_OPERATORS = [// domain => nice => zero
'domain', 'nice', 'zero', // interpolate before round
'interpolate', 'round', // set range then reverse
'range', 'reverse', // Order does not matter for these operators
'align', 'base', 'clamp', 'constant', 'exponent', 'padding', 'unknown'];
// Use Record to enforce that all keys in OperatorType must exist.
var operators = {
  domain: domain,
  nice: nice,
  zero: zero,
  interpolate: interpolate,
  round: round,
  align: align,
  base: base,
  clamp: clamp,
  constant: constant,
  exponent: exponent,
  padding: padding,
  range: range,
  reverse: reverse,
  unknown: unknown
};
export default function scaleOperator() {
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