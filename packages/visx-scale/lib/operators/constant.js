"use strict";

exports.__esModule = true;
exports.default = applyConstant;

function applyConstant(scale, config) {
  if ('constant' in scale && 'constant' in config && typeof config.constant !== 'undefined') {
    scale.constant(config.constant);
  }
}