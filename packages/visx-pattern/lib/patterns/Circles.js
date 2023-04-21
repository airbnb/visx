"use strict";

exports.__esModule = true;
exports.default = Circles;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Pattern = _interopRequireDefault(require("./Pattern"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Circles(_ref) {
  var _corners;
  var id = _ref.id,
    width = _ref.width,
    height = _ref.height,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 2 : _ref$radius,
    fill = _ref.fill,
    stroke = _ref.stroke,
    strokeWidth = _ref.strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    background = _ref.background,
    _ref$complement = _ref.complement,
    complement = _ref$complement === void 0 ? false : _ref$complement,
    className = _ref.className;
  var corners;
  if (complement) {
    corners = [[0, 0], [0, height], [width, 0], [width, height]];
  }
  return /*#__PURE__*/_react.default.createElement(_Pattern.default, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/_react.default.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/_react.default.createElement("circle", {
    className: (0, _classnames.default)('visx-pattern-circle', className),
    cx: width / 2,
    cy: height / 2,
    r: radius,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), (_corners = corners) == null ? void 0 : _corners.map(function (_ref2) {
    var cornerX = _ref2[0],
      cornerY = _ref2[1];
    return /*#__PURE__*/_react.default.createElement("circle", {
      key: id + "-complement-" + cornerX + "-" + cornerY,
      className: (0, _classnames.default)('visx-pattern-circle visx-pattern-circle-complement', className),
      cx: cornerX,
      cy: cornerY,
      r: radius,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray
    });
  }));
}
Circles.propTypes = {
  id: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  radius: _propTypes.default.number,
  fill: _propTypes.default.string,
  className: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  strokeDasharray: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  complement: _propTypes.default.bool,
  background: _propTypes.default.string
};