"use strict";

exports.__esModule = true;
exports.default = getAxisRangePaddingConfig;
exports.defaultAxisRangePadding = void 0;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var defaultAxisRangePadding = 0;
exports.defaultAxisRangePadding = defaultAxisRangePadding;
function getAxisRangePaddingConfig(originalRangePadding) {
  if (originalRangePadding === void 0) {
    originalRangePadding = defaultAxisRangePadding;
  }
  return typeof originalRangePadding === 'number' ? {
    start: originalRangePadding,
    end: originalRangePadding
  } : _extends({
    start: defaultAxisRangePadding,
    end: defaultAxisRangePadding
  }, originalRangePadding);
}