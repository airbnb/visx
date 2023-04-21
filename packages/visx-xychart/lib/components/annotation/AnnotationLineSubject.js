"use strict";

exports.__esModule = true;
exports.default = AnnotationLineSubject;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _annotation = require("@visx/annotation");
var _DataContext = _interopRequireDefault(require("../../context/DataContext"));
var _excluded = ["min", "max"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/** AnnotationLineSubject which provides color and dimensions from context. */
function AnnotationLineSubject(_ref) {
  var _ref2, _margin$left, _margin$top;
  var min = _ref.min,
    max = _ref.max,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.default),
    theme = _useContext.theme,
    margin = _useContext.margin,
    _useContext$innerHeig = _useContext.innerHeight,
    innerHeight = _useContext$innerHeig === void 0 ? 0 : _useContext$innerHeig,
    _useContext$innerWidt = _useContext.innerWidth,
    innerWidth = _useContext$innerWidt === void 0 ? 0 : _useContext$innerWidt;
  return /*#__PURE__*/_react.default.createElement(_annotation.LineSubject, _extends({
    stroke: theme == null ? void 0 : theme.axisStyles.x.bottom.axisLine.stroke,
    min: (_ref2 = min != null ? min : props.orientation === 'horizontal' ? margin == null ? void 0 : margin.left : margin == null ? void 0 : margin.top) != null ? _ref2 : 0,
    max: max != null ? max : props.orientation === 'horizontal' ? ((_margin$left = margin == null ? void 0 : margin.left) != null ? _margin$left : 0) + innerWidth : ((_margin$top = margin == null ? void 0 : margin.top) != null ? _margin$top : 0) + innerHeight
  }, props));
}
AnnotationLineSubject.propTypes = {
  min: _propTypes.default.number,
  max: _propTypes.default.number
};