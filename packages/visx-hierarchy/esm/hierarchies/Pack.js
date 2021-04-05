import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { pack as d3pack } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultNode';
export default function Pack(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      radius = _ref.radius,
      size = _ref.size,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent;
  var pack = d3pack();
  if (size) pack.size(size);
  if (radius !== undefined) pack.radius(radius);
  if (padding) pack.padding(padding);
  var data = pack(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group, {
    top: top,
    left: left,
    className: cx('visx-pack', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "pack-node-" + i
    }, /*#__PURE__*/React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Pack.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  radius: _pt.func,
  padding: _pt.number
};