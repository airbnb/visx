import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { partition as d3partition } from 'd3-hierarchy';
import DefaultNode from '../HierarchyDefaultRectNode';
export default function Partition(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent;
  var partition = d3partition();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);
  var data = partition(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group, {
    top: top,
    left: left,
    className: cx('visx-partition', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "partition-node-" + i
    }, /*#__PURE__*/React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Partition.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  round: _pt.bool,
  padding: _pt.number
};