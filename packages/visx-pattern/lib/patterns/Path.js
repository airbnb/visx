"use strict";

exports.__esModule = true;
exports.default = Path;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Pattern = _interopRequireDefault(require("./Pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Path(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      path = _ref.path,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeLinecap = _ref.strokeLinecap,
      strokeLinecap = _ref$strokeLinecap === void 0 ? 'square' : _ref$strokeLinecap,
      _ref$shapeRendering = _ref.shapeRendering,
      shapeRendering = _ref$shapeRendering === void 0 ? 'auto' : _ref$shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement(_Pattern.default, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/_react.default.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: (0, _classnames.default)('visx-pattern-path', className),
    d: path,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering
  }));
}

Path.propTypes = {
  id: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  path: _propTypes.default.string,
  fill: _propTypes.default.string,
  className: _propTypes.default.string,
  background: _propTypes.default.string,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  strokeDasharray: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeLinecap: _propTypes.default.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};