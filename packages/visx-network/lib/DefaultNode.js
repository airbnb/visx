"use strict";

exports.__esModule = true;
exports.default = DefaultNode;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["r", "fill"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function DefaultNode(_ref) {
  var _ref$r = _ref.r,
    r = _ref$r === void 0 ? 15 : _ref$r,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#21D4FD' : _ref$fill,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("circle", _extends({
    r: r,
    fill: fill
  }, rest));
}
DefaultNode.propTypes = {
  cx: _propTypes.default.number,
  cy: _propTypes.default.number
};