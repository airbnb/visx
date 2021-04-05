"use strict";

exports.__esModule = true;
exports.default = LinePathAnnotation;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _shape = require("@visx/shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LinePathAnnotation(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$points = _ref.points,
      points = _ref$points === void 0 ? [] : _ref$points,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'black' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      className = _ref.className,
      label = _ref.label,
      _ref$labelAnchor = _ref.labelAnchor,
      labelAnchor = _ref$labelAnchor === void 0 ? 'middle' : _ref$labelAnchor,
      _ref$labelDx = _ref.labelDx,
      labelDx = _ref$labelDx === void 0 ? 0 : _ref$labelDx,
      _ref$labelDy = _ref.labelDy,
      labelDy = _ref$labelDy === void 0 ? 0 : _ref$labelDy,
      labelFill = _ref.labelFill,
      _ref$labelFontSize = _ref.labelFontSize,
      labelFontSize = _ref$labelFontSize === void 0 ? 10 : _ref$labelFontSize,
      _ref$labelStroke = _ref.labelStroke,
      labelStroke = _ref$labelStroke === void 0 ? 'white' : _ref$labelStroke,
      _ref$labelStrokeWidth = _ref.labelStrokeWidth,
      labelStrokeWidth = _ref$labelStrokeWidth === void 0 ? 3 : _ref$labelStrokeWidth,
      _ref$labelPaintOrder = _ref.labelPaintOrder,
      labelPaintOrder = _ref$labelPaintOrder === void 0 ? 'stroke' : _ref$labelPaintOrder;
  var endPoint = points[points.length - 1];
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: "visx-line-path-annotation-group",
    top: top,
    left: left
  }, /*#__PURE__*/_react.default.createElement(_shape.LinePath, {
    className: (0, _classnames.default)('visx-line-path-annotation', className),
    data: points,
    x: function x(p) {
      return p.x;
    },
    y: function y(p) {
      return p.y;
    },
    stroke: stroke,
    strokeWidth: strokeWidth
  }), label && endPoint && /*#__PURE__*/_react.default.createElement("text", {
    x: endPoint.x,
    y: endPoint.y,
    dx: labelDx,
    dy: labelDy,
    fontSize: labelFontSize,
    fill: labelFill || stroke,
    stroke: labelStroke,
    strokeWidth: labelStrokeWidth,
    textAnchor: labelAnchor,
    paintOrder: labelPaintOrder
  }, label));
}

LinePathAnnotation.propTypes = {
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  points: _propTypes.default.array,
  stroke: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  className: _propTypes.default.string,
  label: _propTypes.default.string,
  labelAnchor: _propTypes.default.oneOf(['start', 'middle', 'end']),
  labelDx: _propTypes.default.number,
  labelDy: _propTypes.default.number,
  labelFill: _propTypes.default.string,
  labelFontSize: _propTypes.default.number,
  labelStroke: _propTypes.default.string,
  labelStrokeWidth: _propTypes.default.number,
  labelPaintOrder: _propTypes.default.string
};