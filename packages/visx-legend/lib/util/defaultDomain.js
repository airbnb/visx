"use strict";

exports.__esModule = true;
exports.default = defaultDomain;

function defaultDomain(_ref) {
  var _ref$steps = _ref.steps,
      steps = _ref$steps === void 0 ? 5 : _ref$steps,
      scale = _ref.scale;
  var domain = scale.domain();
  var start = domain[0];
  var end = domain[domain.length - 1];

  if (typeof start === 'number' && typeof end === 'number') {
    var step = (end - start) / (steps - 1);
    return new Array(steps).fill(1).reduce(function (acc, cur, i) {
      acc.push(start + i * step);
      return acc;
    }, []);
  }

  return [];
}