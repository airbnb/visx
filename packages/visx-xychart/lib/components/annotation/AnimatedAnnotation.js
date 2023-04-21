"use strict";

exports.__esModule = true;
exports.default = AnimatedAnnotation;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _web = require("@react-spring/web");
var _annotation = require("@visx/annotation");
var _BaseAnnotation = _interopRequireDefault(require("./private/BaseAnnotation"));
var _excluded = ["x", "y", "AnnotationComponent"],
  _excluded2 = ["editable"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BaseAnimatedAnnotation(_ref) {
  var _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    AnnotationComponent = _ref.AnnotationComponent,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var lastXY = (0, _react.useRef)({
    x: x,
    y: y
  });

  // in order to keep x/y/dx/dy accurate in AnnotationComponent, animate the delta
  // between positions, to an x + y transform of zero from the previous value
  var animatedXY = (0, _web.useSpring)({
    from: {
      x: lastXY.current.x - x,
      y: lastXY.current.y - y
    },
    to: {
      x: 0,
      y: 0
    },
    reset: true
  });
  (0, _react.useEffect)(function () {
    lastXY.current = {
      x: x,
      y: y
    };
  }, [x, y]);
  return /*#__PURE__*/_react.default.createElement(_web.animated.g, {
    // for perf animate a group element not the Annotation itself
    transform: (0, _web.to)([animatedXY.x, animatedXY.y], function (xVal, yVal) {
      return "translate(" + xVal + ", " + yVal + ")";
    })
  }, /*#__PURE__*/_react.default.createElement(AnnotationComponent, _extends({
    x: x,
    y: y
  }, props)));
}
function AnimatedAnnotation(_ref2) {
  var editable = _ref2.editable,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var AnnotationComponent = (0, _react.useCallback)(function (annotationProps) {
    return /*#__PURE__*/_react.default.createElement(BaseAnimatedAnnotation, _extends({
      AnnotationComponent: editable ? _annotation.EditableAnnotation : _annotation.Annotation
    }, annotationProps));
  }, [editable]);
  return /*#__PURE__*/_react.default.createElement(_BaseAnnotation.default, _extends({
    AnnotationComponent: AnnotationComponent
  }, props));
}
AnimatedAnnotation.propTypes = {
  editable: _propTypes.default.bool
};