import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import DefaultNode from './DefaultNode';
export default function Nodes(_ref) {
  var _ref$nodes = _ref.nodes,
    nodes = _ref$nodes === void 0 ? [] : _ref$nodes,
    _ref$nodeComponent = _ref.nodeComponent,
    nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent,
    className = _ref.className,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? function (d) {
      return (d == null ? void 0 : d.x) || 0;
    } : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? function (d) {
      return (d == null ? void 0 : d.y) || 0;
    } : _ref$y;
  return /*#__PURE__*/React.createElement(React.Fragment, null, nodes.map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "network-node-" + i,
      className: cx('visx-network-node', className),
      left: x(node),
      top: y(node)
    }, /*#__PURE__*/React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Nodes.propTypes = {
  nodes: _pt.array,
  className: _pt.string,
  x: _pt.func,
  y: _pt.func
};