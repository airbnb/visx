"use strict";

exports.__esModule = true;
exports.default = RectClipPath;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _ClipPath = _interopRequireDefault(require("./ClipPath"));
var _excluded = ["id", "x", "y", "width", "height"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function RectClipPath(_ref) {
  var id = _ref.id,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 1 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 1 : _ref$height,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_ClipPath.default, {
    id: id
  }, /*#__PURE__*/_react.default.createElement("rect", _extends({
    x: x,
    y: y,
    width: width,
    height: height
  }, restProps)));
}
RectClipPath.propTypes = {
  id: _propTypes.default.string.isRequired,
  x: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  y: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};