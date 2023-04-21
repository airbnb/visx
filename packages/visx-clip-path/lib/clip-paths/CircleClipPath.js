"use strict";

exports.__esModule = true;
exports.default = CircleClipPath;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ClipPath = _interopRequireDefault(require("./ClipPath"));
var _excluded = ["id", "cx", "cy", "r"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/** ClipPath for clipping to the shape of a `<circle />`, pass any `<circle />` props you want. */
function CircleClipPath(_ref) {
  var id = _ref.id,
    cx = _ref.cx,
    cy = _ref.cy,
    r = _ref.r,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_ClipPath.default, {
    id: id
  }, /*#__PURE__*/_react.default.createElement("circle", _extends({
    cx: cx,
    cy: cy,
    r: r
  }, restProps)));
}
CircleClipPath.propTypes = {
  id: _propTypes.default.string.isRequired,
  cx: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  cy: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  r: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};