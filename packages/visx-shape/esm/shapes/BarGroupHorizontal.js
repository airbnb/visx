function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import Bar from './Bar';
import getBandwidth from '../util/getBandwidth';
export default function BarGroupHorizontalComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? function () {
    return (
      /** val */
      0
    );
  } : _ref$x,
      y0 = _ref.y0,
      y0Scale = _ref.y0Scale,
      y1Scale = _ref.y1Scale,
      xScale = _ref.xScale,
      color = _ref.color,
      keys = _ref.keys,
      width = _ref.width,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["data", "className", "top", "left", "x", "y0", "y0Scale", "y1Scale", "xScale", "color", "keys", "width", "children"]);

  var barHeight = getBandwidth(y1Scale);
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
  }); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barGroups));
  return /*#__PURE__*/React.createElement(Group, {
    className: cx('visx-bar-group-horizontal', className),
    top: top,
    left: left
  }, barGroups.map(function (barGroup) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "bar-group-" + barGroup.index + "-" + barGroup.y0,
      top: barGroup.y0
    }, barGroup.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends({
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