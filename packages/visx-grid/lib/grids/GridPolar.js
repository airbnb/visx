"use strict";

exports.__esModule = true;
exports.default = GridPolar;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _GridAngle = _interopRequireDefault(require("./GridAngle"));

var _GridRadial = _interopRequireDefault(require("./GridRadial"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GridPolar(_ref) {
  var arcThickness = _ref.arcThickness,
      className = _ref.className,
      classNameAngle = _ref.classNameAngle,
      classNameRadial = _ref.classNameRadial,
      endAngle = _ref.endAngle,
      fillRadial = _ref.fillRadial,
      innerRadius = _ref.innerRadius,
      left = _ref.left,
      lineClassNameAngle = _ref.lineClassNameAngle,
      lineClassNameRadial = _ref.lineClassNameRadial,
      lineStyleAngle = _ref.lineStyleAngle,
      lineStyleRadial = _ref.lineStyleRadial,
      numTicksAngle = _ref.numTicksAngle,
      numTicksRadial = _ref.numTicksRadial,
      outerRadius = _ref.outerRadius,
      scaleAngle = _ref.scaleAngle,
      scaleRadial = _ref.scaleRadial,
      startAngle = _ref.startAngle,
      strokeAngle = _ref.strokeAngle,
      strokeRadial = _ref.strokeRadial,
      strokeWidthAngle = _ref.strokeWidthAngle,
      strokeWidthRadial = _ref.strokeWidthRadial,
      strokeDasharrayAngle = _ref.strokeDasharrayAngle,
      strokeDasharrayRadial = _ref.strokeDasharrayRadial,
      tickValuesAngle = _ref.tickValuesAngle,
      tickValuesRadial = _ref.tickValuesRadial,
      top = _ref.top;
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: (0, _classnames.default)('visx-grid-polar', className),
    top: top,
    left: left
  }, /*#__PURE__*/_react.default.createElement(_GridAngle.default, {
    className: classNameAngle,
    innerRadius: innerRadius,
    lineClassName: lineClassNameAngle,
    lineStyle: lineStyleAngle,
    numTicks: numTicksAngle,
    outerRadius: outerRadius,
    scale: scaleAngle,
    stroke: strokeAngle,
    strokeWidth: strokeWidthAngle,
    strokeDasharray: strokeDasharrayAngle,
    tickValues: tickValuesAngle
  }), /*#__PURE__*/_react.default.createElement(_GridRadial.default, {
    arcThickness: arcThickness,
    className: classNameRadial,
    endAngle: endAngle,
    fill: fillRadial,
    lineClassName: lineClassNameRadial,
    lineStyle: lineStyleRadial,
    numTicks: numTicksRadial,
    scale: scaleRadial,
    startAngle: startAngle,
    stroke: strokeRadial,
    strokeWidth: strokeWidthRadial,
    strokeDasharray: strokeDasharrayRadial,
    tickValues: tickValuesRadial
  }));
}

GridPolar.propTypes = {
  arcThickness: _propTypes.default.number,
  classNameAngle: _propTypes.default.string,
  classNameRadial: _propTypes.default.string,
  endAngle: _propTypes.default.number,
  fillRadial: _propTypes.default.string,
  innerRadius: _propTypes.default.number,
  lineClassNameAngle: _propTypes.default.string,
  lineClassNameRadial: _propTypes.default.string,
  numTicksAngle: _propTypes.default.number,
  numTicksRadial: _propTypes.default.number,
  outerRadius: _propTypes.default.number.isRequired,
  startAngle: _propTypes.default.number,
  strokeAngle: _propTypes.default.string,
  strokeRadial: _propTypes.default.string,
  strokeDasharrayAngle: _propTypes.default.string,
  strokeDasharrayRadial: _propTypes.default.string,
  strokeWidthAngle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeWidthRadial: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  tickValuesAngle: _propTypes.default.array,
  tickValuesRadial: _propTypes.default.array,
  top: _propTypes.default.number
};