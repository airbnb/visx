function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
export default function BarStackComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x = _ref.x,
      _ref$y = _ref.y0,
      y0 = _ref$y === void 0 ? getFirstItem : _ref$y,
      _ref$y2 = _ref.y1,
      y1 = _ref$y2 === void 0 ? getSecondItem : _ref$y2,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      color = _ref.color,
      keys = _ref.keys,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["data", "className", "top", "left", "x", "y0", "y1", "xScale", "yScale", "color", "keys", "value", "order", "offset", "children"]);

  var stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));
  var stacks = stack(data);
  var barWidth = getBandwidth(xScale);
  var barStacks = stacks.map(function (barStack, i) {
    var key = barStack.key;
    return {
      index: i,
      key: key,
      bars: barStack.map(function (bar, j) {
        var barHeight = (yScale(y0(bar)) || 0) - (yScale(y1(bar)) || 0);
        var barY = yScale(y1(bar));
        var barX = 'bandwidth' in xScale ? xScale(x(bar.data)) : Math.max((xScale(x(bar.data)) || 0) - barWidth / 2);
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
  }); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barStacks));
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-bar-stack', className),
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