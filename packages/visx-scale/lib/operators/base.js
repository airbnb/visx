"use strict";

exports.__esModule = true;
exports.default = applyBase;

function applyBase(scale, config) {
  if ('base' in scale && 'base' in config && typeof config.base !== 'undefined') {
    scale.base(config.base);
  }
}