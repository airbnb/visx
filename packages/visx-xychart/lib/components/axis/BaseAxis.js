"use strict";

exports.__esModule = true;
exports.default = BaseAxis;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DataContext = _interopRequireDefault(require("../../context/DataContext"));
var _excluded = ["AxisComponent"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Component which handles all xychart-specific logic for axes,
 * and passes processed props to a specified Axis / AnimatedAxis component.
 */
function BaseAxis(_ref) {
  var _margin$bottom, _margin$top, _margin$left, _margin$right, _axisStyles$axisLine, _axisStyles$axisLine2, _axisStyles$tickLine;
  var AxisComponent = _ref.AxisComponent,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.default),
    theme = _useContext.theme,
    xScale = _useContext.xScale,
    yScale = _useContext.yScale,
    margin = _useContext.margin,
    width = _useContext.width,
    height = _useContext.height;
  var orientation = props.orientation;
  var axisStyles = (0, _react.useMemo)(function () {
    var _theme$axisStyles, _theme$axisStyles$y, _theme$axisStyles2, _theme$axisStyles2$x;
    return orientation === 'left' || orientation === 'right' ? theme == null ? void 0 : (_theme$axisStyles = theme.axisStyles) == null ? void 0 : (_theme$axisStyles$y = _theme$axisStyles.y) == null ? void 0 : _theme$axisStyles$y[orientation] : theme == null ? void 0 : (_theme$axisStyles2 = theme.axisStyles) == null ? void 0 : (_theme$axisStyles2$x = _theme$axisStyles2.x) == null ? void 0 : _theme$axisStyles2$x[orientation];
  }, [theme, orientation]);
  var maybeTickLabelProps = props.tickLabelProps;
  var tickLabelProps = (0, _react.useMemo)(function () {
    return maybeTickLabelProps || axisStyles // construct from props + theme if possible
    ? function (value, index, values) {
      return (// by default, wrap vertical-axis tick labels within the allotted margin space
        // this does not currently account for axis label
        _extends({}, axisStyles == null ? void 0 : axisStyles.tickLabel, {
          width: orientation === 'left' || orientation === 'right' ? margin == null ? void 0 : margin[orientation] : undefined
        }, typeof maybeTickLabelProps === 'function' ? maybeTickLabelProps(value, index, values) : maybeTickLabelProps)
      );
    } : undefined;
  }, [maybeTickLabelProps, axisStyles, orientation, margin]);
  var topOffset = orientation === 'bottom' ? (height != null ? height : 0) - ((_margin$bottom = margin == null ? void 0 : margin.bottom) != null ? _margin$bottom : 0) : orientation === 'top' ? (_margin$top = margin == null ? void 0 : margin.top) != null ? _margin$top : 0 : 0;
  var leftOffset = orientation === 'left' ? (_margin$left = margin == null ? void 0 : margin.left) != null ? _margin$left : 0 : orientation === 'right' ? (width != null ? width : 0) - ((_margin$right = margin == null ? void 0 : margin.right) != null ? _margin$right : 0) : 0;
  var scale = orientation === 'left' || orientation === 'right' ? yScale : xScale;
  return scale ? /*#__PURE__*/_react.default.createElement(AxisComponent, _extends({
    top: topOffset,
    left: leftOffset,
    labelProps: axisStyles == null ? void 0 : axisStyles.axisLabel,
    stroke: axisStyles == null ? void 0 : (_axisStyles$axisLine = axisStyles.axisLine) == null ? void 0 : _axisStyles$axisLine.stroke,
    strokeWidth: axisStyles == null ? void 0 : (_axisStyles$axisLine2 = axisStyles.axisLine) == null ? void 0 : _axisStyles$axisLine2.strokeWidth,
    tickLength: axisStyles == null ? void 0 : axisStyles.tickLength,
    tickStroke: axisStyles == null ? void 0 : (_axisStyles$tickLine = axisStyles.tickLine) == null ? void 0 : _axisStyles$tickLine.stroke
  }, props, {
    tickLabelProps: tickLabelProps,
    scale: scale
  })) : null;
}