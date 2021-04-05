import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { cluster as d3cluster } from 'd3-hierarchy';
import DefaultLink from '../HierarchyDefaultLink';
import DefaultNode from '../HierarchyDefaultNode';
export default function Cluster(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? DefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent;
  var cluster = d3cluster();
  if (size) cluster.size(size);
  if (nodeSize !== undefined) cluster.nodeSize(nodeSize);
  if (separation) cluster.separation(separation);
  var data = cluster(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group, {
    top: top,
    left: left,
    className: cx('visx-cluster', className)
  }, linkComponent && data.links().map(function (link, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "cluster-link-" + i
    }, /*#__PURE__*/React.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "cluster-node-" + i
    }, /*#__PURE__*/React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Cluster.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  separation: _pt.func
};