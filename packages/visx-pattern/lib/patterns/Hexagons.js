"use strict";

exports.__esModule = true;
exports.default = Hexagons;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Path = _interopRequireDefault(require("./Path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Hexagons(_ref) {
  var id = _ref.id,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 3 : _ref$size;
  var sqrtSize = Math.sqrt(size);
  return /*#__PURE__*/_react.default.createElement(_Path.default, {
    className: (0, _classnames.default)('visx-pattern-hexagon', className),
    path: "M " + height + ",0 l " + height + ",0 l " + height / 2 + "," + height * sqrtSize / 2 + " l " + -height / 2 + "," + height * sqrtSize / 2 + " l " + -height + ",0 l " + -height / 2 + "," + -height * sqrtSize / 2 + " Z M 0," + height * sqrtSize / 2 + " l " + height / 2 + ",0 M " + 3 * height + "," + height * sqrtSize / 2 + " l " + -height / 2 + ",0",
    id: id,
    width: size,
    height: sqrtSize,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}

Hexagons.propTypes = {
  id: _propTypes.default.string.isRequired,
  height: _propTypes.default.number.isRequired,
  size: _propTypes.default.number,
  fill: _propTypes.default.string,
  className: _propTypes.default.string,
  background: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  strokeDasharray: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeLinecap: _propTypes.default.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};