"use strict";

exports.__esModule = true;
exports.default = Cluster;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _d3Hierarchy = require("d3-hierarchy");

var _HierarchyDefaultLink = _interopRequireDefault(require("../HierarchyDefaultLink"));

var _HierarchyDefaultNode = _interopRequireDefault(require("../HierarchyDefaultNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cluster(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? _HierarchyDefaultLink.default : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? _HierarchyDefaultNode.default : _ref$nodeComponent;
  var cluster = (0, _d3Hierarchy.cluster)();
  if (size) cluster.size(size);
  if (nodeSize !== undefined) cluster.nodeSize(nodeSize);
  if (separation) cluster.separation(separation);
  var data = cluster(root);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(data));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left,
    className: (0, _classnames.default)('visx-cluster', className)
  }, linkComponent && data.links().map(function (link, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "cluster-link-" + i
    }, /*#__PURE__*/_react.default.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "cluster-node-" + i
    }, /*#__PURE__*/_react.default.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Cluster.propTypes = {
  children: _propTypes.default.func,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  className: _propTypes.default.string,
  separation: _propTypes.default.func
};