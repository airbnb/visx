"use strict";

exports.__esModule = true;
exports.default = AnimatedGridLines;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _useLineTransitionConfig = _interopRequireDefault(require("../spring-configs/useLineTransitionConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AnimatedGridLines(_ref) {
  var scale = _ref.scale,
      lines = _ref.lines,
      animationTrajectory = _ref.animationTrajectory,
      animateXOrY = _ref.animateXOrY,
      lineKey = _ref.lineKey,
      lineStyle = _ref.lineStyle,
      lineProps = _objectWithoutPropertiesLoose(_ref, ["scale", "lines", "animationTrajectory", "animateXOrY", "lineKey", "lineStyle"]);

  var animatedLines = (0, _reactSpring.useTransition)(lines, lineKey, (0, _useLineTransitionConfig.default)({
    scale: scale,
    animateXOrY: animateXOrY,
    animationTrajectory: animationTrajectory
  }));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    _react.default.createElement(_react.default.Fragment, null, animatedLines.map(function ( // @ts-ignore react-spring types only include CSSProperties
    _ref2) {
      var key = _ref2.key,
          _ref2$props = _ref2.props,
          fromX = _ref2$props.fromX,
          toX = _ref2$props.toX,
          fromY = _ref2$props.fromY,
          toY = _ref2$props.toY,
          opacity = _ref2$props.opacity;
      return /*#__PURE__*/_react.default.createElement(_reactSpring.animated.line, _extends({
        key: key,
        x1: fromX,
        x2: toX,
        y1: fromY,
        y2: toY,
        strokeOpacity: opacity,
        style: lineStyle
      }, lineProps));
    }))
  );
}

AnimatedGridLines.propTypes = {
  lineKey: _propTypes.default.func.isRequired
};