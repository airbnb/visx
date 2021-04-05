import _pt from "prop-types";
import React from 'react';
import { Group } from '@visx/group';
import Links from './Links';
import Nodes from './Nodes';
import DefaultNode from './DefaultNode';
import DefaultLink from './DefaultLink';
export default function Graph(_ref) {
  var graph = _ref.graph,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? DefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent,
      top = _ref.top,
      left = _ref.left;
  return graph ? /*#__PURE__*/React.createElement(Group, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(Links, {
    links: graph.links,
    linkComponent: linkComponent
  }), /*#__PURE__*/React.createElement(Nodes, {
    nodes: graph.nodes,
    nodeComponent: nodeComponent
  })) : null;
}
Graph.propTypes = {
  top: _pt.number,
  left: _pt.number
};