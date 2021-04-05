"use strict";

exports.__esModule = true;
exports.default = ShapeLine;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _group = require("@visx/group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShapeLine(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  var lineThickness = typeof (style == null ? void 0 : style.strokeWidth) === 'number' ? style == null ? void 0 : style.strokeWidth : 2;
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: cleanHeight / 2 - lineThickness / 2
  }, /*#__PURE__*/_react.default.createElement("line", {
    x1: 0,
    x2: width,
    y1: 0,
    y2: 0,
    stroke: fill,
    strokeWidth: lineThickness,
    style: style
  })));
}

ShapeLine.propTypes = {
  fill: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};