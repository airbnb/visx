"use strict";

exports.__esModule = true;
exports.default = HeatmapRect;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _excluded = ["className", "top", "left", "data", "binWidth", "binHeight", "x0", "gap", "xScale", "yScale", "colorScale", "opacityScale", "bins", "count", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function HeatmapRect(_ref) {
  var className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$binWidth = _ref.binWidth,
    binWidth = _ref$binWidth === void 0 ? 6 : _ref$binWidth,
    _ref$binHeight = _ref.binHeight,
    binHeight = _ref$binHeight === void 0 ? 6 : _ref$binHeight,
    _ref$x = _ref.x0,
    x0 = _ref$x === void 0 ? 0 : _ref$x,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 1 : _ref$gap,
    xScale = _ref.xScale,
    yScale = _ref.yScale,
    _ref$colorScale = _ref.colorScale,
    colorScale = _ref$colorScale === void 0 ? function () {
      return undefined;
    } : _ref$colorScale,
    _ref$opacityScale = _ref.opacityScale,
    opacityScale = _ref$opacityScale === void 0 ? function () {
      return 1;
    } : _ref$opacityScale,
    _ref$bins = _ref.bins,
    bins = _ref$bins === void 0 ? function (d) {
      return d == null ? void 0 : d.bins;
    } : _ref$bins,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? function (d) {
      return d == null ? void 0 : d.count;
    } : _ref$count,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var width = binWidth - gap;
  var height = binHeight - gap;
  var heatmap = data.map(function (datum, column) {
    var x = xScale(column);
    return bins(datum).map(function (bin, row) {
      var countValue = count(bin);
      return {
        bin: bin,
        row: row,
        column: column,
        datum: datum,
        width: width,
        height: height,
        gap: gap,
        count: countValue,
        x: x + x0,
        y: yScale(row) + gap,
        color: colorScale(countValue),
        opacity: opacityScale(countValue)
      };
    });
  });
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(heatmap));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: "visx-heatmap-rects",
    top: top,
    left: left
  }, heatmap.map(function (_bins) {
    return _bins.map(function (bin) {
      return /*#__PURE__*/_react.default.createElement("rect", _extends({
        key: "heatmap-tile-rect-" + bin.row + "-" + bin.column,
        className: (0, _classnames.default)('visx-heatmap-rect', className),
        width: bin.width,
        height: bin.height,
        x: bin.x,
        y: bin.y,
        fill: bin.color,
        fillOpacity: bin.opacity
      }, restProps));
    });
  }));
}
HeatmapRect.propTypes = {
  data: _propTypes.default.array,
  left: _propTypes.default.number,
  top: _propTypes.default.number,
  binWidth: _propTypes.default.number,
  binHeight: _propTypes.default.number,
  x0: _propTypes.default.number,
  gap: _propTypes.default.number,
  xScale: _propTypes.default.func.isRequired,
  yScale: _propTypes.default.func.isRequired,
  bins: _propTypes.default.func,
  count: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.func
};