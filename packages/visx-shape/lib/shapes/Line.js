"use strict";

exports.__esModule = true;
exports.default = Line;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Line(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? {
    x: 0,
    y: 0
  } : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? {
    x: 1,
    y: 1
  } : _ref$to,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose(_ref, ["from", "to", "fill", "className", "innerRef"]);

  var isRectilinear = from.x === to.x || from.y === to.y;
  return /*#__PURE__*/_react.default.createElement("line", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-line', className),
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    fill: fill,
    shapeRendering: isRectilinear ? 'crispEdges' : 'auto'
  }, restProps));
}