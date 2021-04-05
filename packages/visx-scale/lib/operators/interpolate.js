"use strict";

exports.__esModule = true;
exports.default = applyInterpolate;

var _createColorInterpolator = _interopRequireDefault(require("../utils/createColorInterpolator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyInterpolate(scale, config) {
  if ('interpolate' in config && 'interpolate' in scale && typeof config.interpolate !== 'undefined') {
    var interpolator = (0, _createColorInterpolator.default)(config.interpolate);
    scale.interpolate(interpolator);
  }
}