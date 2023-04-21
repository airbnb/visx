"use strict";

exports.__esModule = true;
exports.default = BaseAnnotation;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _scale = require("@visx/scale");
var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));
var _getScaleBandwidth = _interopRequireDefault(require("../../../utils/getScaleBandwidth"));
var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));
var _excluded = ["AnnotationComponent", "children", "datum", "dataKey", "xAccessor", "yAccessor", "dx", "dy"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// used for auto-positioning
var minimumLabelDimension = 16;
function BaseAnnotation(_ref) {
  var _coerceNumber, _coerceNumber2;
  var AnnotationComponent = _ref.AnnotationComponent,
    children = _ref.children,
    datum = _ref.datum,
    dataKey = _ref.dataKey,
    propsXAccessor = _ref.xAccessor,
    propsYAccessor = _ref.yAccessor,
    _ref$dx = _ref.dx,
    propsDx = _ref$dx === void 0 ? 0 : _ref$dx,
    _ref$dy = _ref.dy,
    propsDy = _ref$dy === void 0 ? 0 : _ref$dy,
    annotationProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _ref2 = (0, _react.useContext)(_DataContext.default) || {},
    innerHeight = _ref2.innerHeight,
    innerWidth = _ref2.innerWidth,
    margin = _ref2.margin,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale,
    dataRegistry = _ref2.dataRegistry;
  var xBandWidth = (0, _react.useMemo)(function () {
    return xScale ? (0, _getScaleBandwidth.default)(xScale) : 0;
  }, [xScale]);
  var yBandWidth = (0, _react.useMemo)(function () {
    return yScale ? (0, _getScaleBandwidth.default)(yScale) : 0;
  }, [yScale]);
  if ((!propsXAccessor || !propsYAccessor) && !dataKey) {
    console.warn('[@visx/xychart/BaseAnnotation]: dataKey or x/yAccessors must be specified.');
    return null;
  }
  var registryEntry = propsXAccessor && propsYAccessor || dataKey == null ? null : dataRegistry == null ? void 0 : dataRegistry.get(dataKey);
  var xAccessor = propsXAccessor || (registryEntry == null ? void 0 : registryEntry.xAccessor);
  var yAccessor = propsYAccessor || (registryEntry == null ? void 0 : registryEntry.yAccessor);
  if (!xScale || !yScale || !innerWidth || !innerHeight || !xAccessor || !yAccessor || !margin) {
    return null;
  }
  var x = ((_coerceNumber = (0, _scale.coerceNumber)(xScale(xAccessor(datum)))) != null ? _coerceNumber : NaN) + xBandWidth / 2;
  var y = ((_coerceNumber2 = (0, _scale.coerceNumber)(yScale(yAccessor(datum)))) != null ? _coerceNumber2 : NaN) + yBandWidth / 2;
  var dx = x + propsDx + minimumLabelDimension > margin.left + innerWidth ? -propsDx : propsDx;
  var dy = y + propsDy + minimumLabelDimension > margin.top + innerHeight ? -propsDy : propsDy;
  return (0, _isValidNumber.default)(x) && (0, _isValidNumber.default)(y) ? /*#__PURE__*/_react.default.createElement(AnnotationComponent, _extends({
    width: innerWidth,
    height: innerHeight
  }, annotationProps, {
    x: x,
    y: y,
    dx: dx,
    dy: dy
  }), children) : null;
}
BaseAnnotation.propTypes = {
  dataKey: _propTypes.default.string,
  xAccessor: _propTypes.default.func,
  yAccessor: _propTypes.default.func
};