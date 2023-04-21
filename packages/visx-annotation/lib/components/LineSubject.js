"use strict";

exports.__esModule = true;
exports.default = LineSubject;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _AnnotationContext = _interopRequireDefault(require("../context/AnnotationContext"));
var _excluded = ["className", "x", "y", "orientation", "min", "max", "stroke"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LineSubject(_ref) {
  var className = _ref.className,
    propsX = _ref.x,
    propsY = _ref.y,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? 'vertical' : _ref$orientation,
    min = _ref.min,
    max = _ref.max,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  // if props are provided, they take precedence over context
  var annotationContext = (0, _react.useContext)(_AnnotationContext.default);
  var lineIsVertical = orientation === 'vertical';
  return /*#__PURE__*/_react.default.createElement("line", _extends({
    className: (0, _classnames.default)('visx-annotation-subject', 'visx-annotation-subject-line', className),
    x1: lineIsVertical ? propsX || annotationContext.x : min,
    x2: lineIsVertical ? propsX || annotationContext.x : max,
    y1: lineIsVertical ? min : propsY || annotationContext.y,
    y2: lineIsVertical ? max : propsY || annotationContext.y,
    fill: "transparent",
    pointerEvents: "none",
    stroke: stroke
  }, restProps));
}
LineSubject.propTypes = {
  className: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  orientation: _propTypes.default.oneOf(['vertical', 'horizontal']),
  x: _propTypes.default.number,
  y: _propTypes.default.number,
  min: _propTypes.default.number.isRequired,
  max: _propTypes.default.number.isRequired
};