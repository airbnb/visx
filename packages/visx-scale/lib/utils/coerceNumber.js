"use strict";

exports.__esModule = true;
exports.default = coerceNumber;

function coerceNumber(val) {
  if ((typeof val === 'function' || typeof val === 'object' && !!val) && 'valueOf' in val) {
    var num = val.valueOf();
    if (typeof num === 'number') return num;
  }

  return val;
}