"use strict";

exports.__esModule = true;
exports.default = Waves;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Path = _interopRequireDefault(require("./Path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Waves(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement(_Path.default, {
    className: (0, _classnames.default)('visx-pattern-wave', className),
    path: "M 0 " + height / 2 + " c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + -height / 2 + " " + height / 2 + "\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + height + " " + height / 2 + "\n             c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0",
    id: id,
    width: width,
    height: height,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}

Waves.propTypes = {
  id: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  fill: _propTypes.default.string,
  className: _propTypes.default.string,
  background: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  strokeDasharray: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeLinecap: _propTypes.default.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};