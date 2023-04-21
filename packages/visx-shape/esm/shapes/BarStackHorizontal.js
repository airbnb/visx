var _excluded = ["data", "className", "top", "left", "y", "x0", "x1", "xScale", "yScale", "color", "keys", "value", "order", "offset", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { stack as d3stack } from 'd3-shape';
import { Group } from '@visx/group';
import { getFirstItem, getSecondItem } from '../util/accessors';
import getBandwidth from '../util/getBandwidth';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
export default function BarStackHorizontal(_ref) {
  var data = _ref.data,
    className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    y = _ref.y,
    _ref$x = _ref.x0,
    x0 = _ref$x === void 0 ? getFirstItem : _ref$x,
    _ref$x2 = _ref.x1,
    x1 = _ref$x2 === void 0 ? getSecondItem : _ref$x2,
    xScale = _ref.xScale,
    yScale = _ref.yScale,
    color = _ref.color,
    keys = _ref.keys,
    value = _ref.value,
    order = _ref.order,
    offset = _ref.offset,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));
  var stacks = stack(data);
  var barHeight = getBandwidth(yScale);
  var barStacks = stacks.map(function (barStack, i) {
    var key = barStack.key;
    return {
      index: i,
      key: key,
      bars: barStack.map(function (bar, j) {
        var barWidth = (xScale(x1(bar)) || 0) - (xScale(x0(bar)) || 0);
        var barX = xScale(x0(bar));
        var barY = 'bandwidth' in yScale ? yScale(y(bar.data)) : Math.max((yScale(y(bar.data)) || 0) - barWidth / 2);
        return {
          bar: bar,
          key: key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX || 0,
          y: barY || 0,
          color: color(barStack.key, j)
        };
      })
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barStacks));
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-bar-stack-horizontal', className),
    top: top,
    left: left
  }, barStacks.map(function (barStack) {
    return barStack.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends({
        key: "bar-stack-" + barStack.index + "-" + bar.index,
        x: bar.x,
        y: bar.y,
        height: bar.height,
        width: bar.width,
        fill: bar.color
      }, restProps));
    });
  }));
}