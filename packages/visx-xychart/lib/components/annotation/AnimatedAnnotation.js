"use strict";

exports.__esModule = true;
exports.default = AnimatedAnnotation;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _annotation = require("@visx/annotation");

var _BaseAnnotation = _interopRequireDefault(require("./private/BaseAnnotation"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AnimatedAnnotation(_ref) {
  var editable = _ref.editable,
      props = _objectWithoutPropertiesLoose(_ref, ["editable"]);

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

function BaseAnimatedAnnotation(_ref2) {
  var _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 0 : _ref2$y,
      AnnotationComponent = _ref2.AnnotationComponent,
      props = _objectWithoutPropertiesLoose(_ref2, ["x", "y", "AnnotationComponent"]);

  var lastXY = (0, _react.useRef)({
    x: x,
    y: y
  }); // in order to keep x/y/dx/dy accurate in AnnotationComponent, animate the delta
  // between positions, to an x + y transform of zero from the previous value

  var animatedXY = (0, _reactSpring.useSpring)({
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
  return /*#__PURE__*/_react.default.createElement(_reactSpring.animated.g, {
    // for perf animate a group element not the Annotation itself
    transform: (0, _reactSpring.interpolate)( // @ts-expect-error from/to mess up the useSpring types
    [animatedXY.x, animatedXY.y], function (xVal, yVal) {
      return "translate(" + xVal + ", " + yVal + ")";
    })
  }, /*#__PURE__*/_react.default.createElement(AnnotationComponent, _extends({
    x: x,
    y: y
  }, props)));
}