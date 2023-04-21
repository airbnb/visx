"use strict";

exports.__esModule = true;
exports.default = Stack;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _D3ShapeFactories = require("../util/D3ShapeFactories");
var _excluded = ["className", "top", "left", "keys", "data", "curve", "defined", "x", "x0", "x1", "y0", "y1", "value", "order", "offset", "color", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Stack(_ref) {
  var className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    keys = _ref.keys,
    data = _ref.data,
    curve = _ref.curve,
    defined = _ref.defined,
    x = _ref.x,
    x0 = _ref.x0,
    x1 = _ref.x1,
    y0 = _ref.y0,
    y1 = _ref.y1,
    value = _ref.value,
    order = _ref.order,
    offset = _ref.offset,
    color = _ref.color,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var stack = (0, _D3ShapeFactories.stack)({
    keys: keys,
    value: value,
    order: order,
    offset: offset
  });
  var path = (0, _D3ShapeFactories.area)({
    x: x,
    x0: x0,
    x1: x1,
    y0: y0,
    y1: y1,
    curve: curve,
    defined: defined
  });
  var stacks = stack(data);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    stacks: stacks,
    path: path,
    stack: stack
  }));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left
  }, stacks.map(function (series, i) {
    return /*#__PURE__*/_react.default.createElement("path", _extends({
      className: (0, _classnames.default)('visx-stack', className),
      key: "stack-" + i + "-" + (series.key || ''),
      d: path(series) || '',
      fill: color == null ? void 0 : color(series.key, i)
    }, restProps));
  }));
}