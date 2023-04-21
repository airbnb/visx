"use strict";

exports.__esModule = true;
exports.default = GlyphStar;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _d3Shape = require("d3-shape");
var _Glyph = _interopRequireDefault(require("./Glyph"));
var _excluded = ["children", "className", "top", "left", "size"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphStar(_ref) {
  var children = _ref.children,
    className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    size = _ref.size,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = (0, _d3Shape.symbol)();
  path.type(_d3Shape.symbolStar);

  // TS can't differentiate the method overload here
  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/_react.default.createElement(_Glyph.default, {
    top: top,
    left: left
  }, /*#__PURE__*/_react.default.createElement("path", _extends({
    className: (0, _classnames.default)('visx-glyph-star', className),
    d: path() || ''
  }, restProps)));
}
GlyphStar.propTypes = {
  children: _propTypes.default.func,
  className: _propTypes.default.string,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func])
};