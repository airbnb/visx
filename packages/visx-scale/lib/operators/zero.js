"use strict";

exports.__esModule = true;
exports.default = applyZero;

function applyZero(scale, config) {
  if ('zero' in config && config.zero === true) {
    var domain = scale.domain();
    var a = domain[0],
        b = domain[1];
    var isDescending = b < a;

    var _ref = isDescending ? [b, a] : [a, b],
        min = _ref[0],
        max = _ref[1];

    var domainWithZero = [Math.min(0, min), Math.max(0, max)];
    scale.domain(isDescending ? domainWithZero.reverse() : domainWithZero);
  }
}