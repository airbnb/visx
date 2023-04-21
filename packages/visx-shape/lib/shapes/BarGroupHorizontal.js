"use strict";

exports.__esModule = true;
exports.default = BarGroupHorizontal;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _Bar = _interopRequireDefault(require("./Bar"));
var _getBandwidth = _interopRequireDefault(require("../util/getBandwidth"));
var _excluded = ["data", "className", "top", "left", "x", "y0", "y0Scale", "y1Scale", "xScale", "color", "keys", "width", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BarGroupHorizontal(_ref) {
  var data = _ref.data,
    className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? function /** val */ () {
      return 0;
    } : _ref$x,
    y0 = _ref.y0,
    y0Scale = _ref.y0Scale,
    y1Scale = _ref.y1Scale,
    xScale = _ref.xScale,
    color = _ref.color,
    keys = _ref.keys,
    width = _ref.width,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var barHeight = (0, _getBandwidth.default)(y1Scale);
  var barGroups = data.map(function (group, i) {
    return {
      index: i,
      y0: y0Scale(y0(group)) || 0,
      bars: keys.map(function (key, j) {
        var value = group[key];
        return {
          index: j,
          key: key,
          value: value,
          height: barHeight,
          x: x(value) || 0,
          y: y1Scale(key) || 0,
          color: color(key, j),
          width: xScale(value) || 0
        };
      })
    };
  });
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(barGroups));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: (0, _classnames.default)('visx-bar-group-horizontal', className),
    top: top,
    left: left
  }, barGroups.map(function (barGroup) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "bar-group-" + barGroup.index + "-" + barGroup.y0,
      top: barGroup.y0
    }, barGroup.bars.map(function (bar) {
      return /*#__PURE__*/_react.default.createElement(_Bar.default, _extends({
        key: "bar-group-bar-" + barGroup.index + "-" + bar.index + "-" + bar.value + "-" + bar.key,
        x: bar.x,
        y: bar.y,
        width: bar.width,
        height: bar.height,
        fill: bar.color
      }, restProps));
    }));
  }));
}