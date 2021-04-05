import _pt from "prop-types";

/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { treemap as d3treemap } from 'd3-hierarchy';
import HierarchyDefaultRectNode from '../HierarchyDefaultRectNode';
import setNumberOrNumberAccessor from '../utils/setNumOrNumAccessor';
export default function Treemap(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      tile = _ref.tile,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      paddingInner = _ref.paddingInner,
      paddingOuter = _ref.paddingOuter,
      paddingTop = _ref.paddingTop,
      paddingRight = _ref.paddingRight,
      paddingBottom = _ref.paddingBottom,
      paddingLeft = _ref.paddingLeft,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultRectNode : _ref$nodeComponent;
  var treemap = d3treemap();
  if (tile) treemap.tile(tile);
  if (size) treemap.size(size);
  if (round) treemap.round(round);
  if (padding) setNumberOrNumberAccessor(treemap.padding, padding);
  if (paddingInner) setNumberOrNumberAccessor(treemap.paddingInner, paddingInner);
  if (paddingOuter) setNumberOrNumberAccessor(treemap.paddingOuter, paddingOuter);
  if (paddingTop) setNumberOrNumberAccessor(treemap.paddingTop, paddingTop);
  if (paddingRight) setNumberOrNumberAccessor(treemap.paddingRight, paddingRight);
  if (paddingBottom) setNumberOrNumberAccessor(treemap.paddingBottom, paddingBottom);
  if (paddingLeft) setNumberOrNumberAccessor(treemap.paddingLeft, paddingLeft);
  var data = treemap(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group, {
    top: top,
    left: left,
    className: cx('visx-treemap', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "treemap-node-" + i
    }, /*#__PURE__*/React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Treemap.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  round: _pt.bool,
  padding: _pt.oneOfType([_pt.number, _pt.func]),
  paddingInner: _pt.oneOfType([_pt.number, _pt.func]),
  paddingOuter: _pt.oneOfType([_pt.number, _pt.func]),
  paddingTop: _pt.oneOfType([_pt.number, _pt.func]),
  paddingRight: _pt.oneOfType([_pt.number, _pt.func]),
  paddingBottom: _pt.oneOfType([_pt.number, _pt.func]),
  paddingLeft: _pt.oneOfType([_pt.number, _pt.func])
};