"use strict";

exports.__esModule = true;
exports.defaultStyles = exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["className", "top", "left", "offsetLeft", "offsetTop", "style", "children", "unstyled", "applyPositionStyle"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyles = {
  position: 'absolute',
  backgroundColor: 'white',
  color: '#666666',
  padding: '.3rem .5rem',
  borderRadius: '3px',
  fontSize: '14px',
  boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
  lineHeight: '1em',
  pointerEvents: 'none'
};
exports.defaultStyles = defaultStyles;
var Tooltip = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    _ref$offsetLeft = _ref.offsetLeft,
    offsetLeft = _ref$offsetLeft === void 0 ? 10 : _ref$offsetLeft,
    _ref$offsetTop = _ref.offsetTop,
    offsetTop = _ref$offsetTop === void 0 ? 10 : _ref$offsetTop,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? defaultStyles : _ref$style,
    children = _ref.children,
    _ref$unstyled = _ref.unstyled,
    unstyled = _ref$unstyled === void 0 ? false : _ref$unstyled,
    _ref$applyPositionSty = _ref.applyPositionStyle,
    applyPositionStyle = _ref$applyPositionSty === void 0 ? false : _ref$applyPositionSty,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref,
    className: (0, _classnames.default)('visx-tooltip', className),
    style: _extends({
      top: top == null || offsetTop == null ? top : top + offsetTop,
      left: left == null || offsetLeft == null ? left : left + offsetLeft
    }, applyPositionStyle && {
      position: 'absolute'
    }, !unstyled && style)
  }, restProps), children);
});
Tooltip.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  left: _propTypes.default.number,
  offsetLeft: _propTypes.default.number,
  offsetTop: _propTypes.default.number,
  top: _propTypes.default.number,
  applyPositionStyle: _propTypes.default.bool,
  unstyled: _propTypes.default.bool
};
Tooltip.displayName = 'Tooltip';
var _default = Tooltip;
exports.default = _default;