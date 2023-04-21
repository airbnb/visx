"use strict";

exports.__esModule = true;
exports.default = GridRows;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Line = _interopRequireDefault(require("@visx/shape/lib/shapes/Line"));
var _group = require("@visx/group");
var _point = require("@visx/point");
var _scale = require("@visx/scale");
var _getScaleBandwidth = _interopRequireDefault(require("../utils/getScaleBandwidth"));
var _excluded = ["top", "left", "scale", "width", "stroke", "strokeWidth", "strokeDasharray", "className", "children", "numTicks", "lineStyle", "offset", "tickValues"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GridRows(_ref) {
  var _ref$top = _ref.top,
    top = _ref$top === void 0 ? 0 : _ref$top,
    _ref$left = _ref.left,
    left = _ref$left === void 0 ? 0 : _ref$left,
    scale = _ref.scale,
    width = _ref.width,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    strokeDasharray = _ref.strokeDasharray,
    className = _ref.className,
    children = _ref.children,
    _ref$numTicks = _ref.numTicks,
    numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
    lineStyle = _ref.lineStyle,
    offset = _ref.offset,
    tickValues = _ref.tickValues,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var ticks = tickValues != null ? tickValues : (0, _scale.getTicks)(scale, numTicks);
  var scaleOffset = (offset != null ? offset : 0) + (0, _getScaleBandwidth.default)(scale) / 2;
  var tickLines = ticks.map(function (d, index) {
    var _coerceNumber;
    var y = ((_coerceNumber = (0, _scale.coerceNumber)(scale(d))) != null ? _coerceNumber : 0) + scaleOffset;
    return {
      index: index,
      from: new _point.Point({
        x: 0,
        y: y
      }),
      to: new _point.Point({
        x: width,
        y: y
      })
    };
  });
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: (0, _classnames.default)('visx-rows', className),
    top: top,
    left: left
  }, children ? children({
    lines: tickLines
  }) : tickLines.map(function (_ref2) {
    var from = _ref2.from,
      to = _ref2.to,
      index = _ref2.index;
    return /*#__PURE__*/_react.default.createElement(_Line.default, _extends({
      key: "row-line-" + index,
      from: from,
      to: to,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridRows.propTypes = {
  tickValues: _propTypes.default.array,
  width: _propTypes.default.number.isRequired
};