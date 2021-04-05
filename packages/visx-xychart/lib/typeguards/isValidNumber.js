"use strict";

exports.__esModule = true;
exports.default = isValidNumber;

function isValidNumber(_) {
  return _ != null && typeof _ === 'number' && !Number.isNaN(_) && Number.isFinite(_);
}