"use strict";

exports.__esModule = true;
exports.default = getScaledValueFactory;

var _isValidNumber = _interopRequireDefault(require("../typeguards/isValidNumber"));

var _getScaleBandwidth = _interopRequireDefault(require("./getScaleBandwidth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */
function getScaledValueFactory(scale, accessor, align) {
  if (align === void 0) {
    align = 'center';
  }

  return function (d) {
    var scaledValue = scale(accessor(d));

    if ((0, _isValidNumber.default)(scaledValue)) {
      var bandwidthOffset = (align === 'start' ? 0 : (0, _getScaleBandwidth.default)(scale)) / (align === 'center' ? 2 : 1);
      return scaledValue + bandwidthOffset;
    }

    return NaN;
  };
}