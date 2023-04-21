"use strict";

exports.__esModule = true;
exports.default = GlyphDot;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Glyph = _interopRequireDefault(require("./Glyph"));
var _excluded = ["top", "left", "className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphDot(_ref) {
  var _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    className = _ref.className,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Glyph.default, {
    top: top,
    left: left
  }, /*#__PURE__*/_react.default.createElement("circle", _extends({
    className: (0, _classnames.default)('visx-glyph-dot', className)
  }, restProps)));
}
GlyphDot.propTypes = {
  className: _propTypes.default.string,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  r: _propTypes.default.number,
  cx: _propTypes.default.number,
  cy: _propTypes.default.number
};