"use strict";

exports.__esModule = true;
exports.default = Text;
var _react = _interopRequireDefault(require("react"));
var _useText2 = _interopRequireDefault(require("./hooks/useText"));
var _excluded = ["dx", "dy", "textAnchor", "innerRef", "innerTextRef", "verticalAnchor", "angle", "lineHeight", "scaleToFit", "capHeight", "width"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SVG_STYLE = {
  overflow: 'visible'
};
function Text(props) {
  var _props$dx = props.dx,
    dx = _props$dx === void 0 ? 0 : _props$dx,
    _props$dy = props.dy,
    dy = _props$dy === void 0 ? 0 : _props$dy,
    _props$textAnchor = props.textAnchor,
    textAnchor = _props$textAnchor === void 0 ? 'start' : _props$textAnchor,
    innerRef = props.innerRef,
    innerTextRef = props.innerTextRef,
    verticalAnchor = props.verticalAnchor,
    angle = props.angle,
    _props$lineHeight = props.lineHeight,
    lineHeight = _props$lineHeight === void 0 ? '1em' : _props$lineHeight,
    _props$scaleToFit = props.scaleToFit,
    scaleToFit = _props$scaleToFit === void 0 ? false : _props$scaleToFit,
    capHeight = props.capHeight,
    width = props.width,
    textProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _textProps$x = textProps.x,
    x = _textProps$x === void 0 ? 0 : _textProps$x,
    fontSize = textProps.fontSize;
  var _useText = (0, _useText2.default)(props),
    wordsByLines = _useText.wordsByLines,
    startDy = _useText.startDy,
    transform = _useText.transform;
  return /*#__PURE__*/_react.default.createElement("svg", {
    ref: innerRef,
    x: dx,
    y: dy,
    fontSize: fontSize,
    style: SVG_STYLE
  }, wordsByLines.length > 0 ? /*#__PURE__*/_react.default.createElement("text", _extends({
    ref: innerTextRef,
    transform: transform
  }, textProps, {
    textAnchor: textAnchor
  }), wordsByLines.map(function (line, index) {
    return /*#__PURE__*/_react.default.createElement("tspan", {
      key: index,
      x: x,
      dy: index === 0 ? startDy : lineHeight
    }, line.words.join(' '));
  })) : null);
}