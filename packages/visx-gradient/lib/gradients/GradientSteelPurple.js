"use strict";

exports.__esModule = true;
exports.default = GradientSteelPurple;
var _react = _interopRequireDefault(require("react"));
var _LinearGradient = _interopRequireDefault(require("./LinearGradient"));
var _excluded = ["from", "to"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */
function GradientSteelPurple(_ref) {
  var _ref$from = _ref.from,
    from = _ref$from === void 0 ? '#65799B' : _ref$from,
    _ref$to = _ref.to,
    to = _ref$to === void 0 ? '#5E2563' : _ref$to,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_LinearGradient.default, _extends({
    from: from,
    to: to
  }, restProps));
}