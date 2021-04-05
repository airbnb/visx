"use strict";

exports.__esModule = true;
exports.default = Partition;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _d3Hierarchy = require("d3-hierarchy");

var _HierarchyDefaultRectNode = _interopRequireDefault(require("../HierarchyDefaultRectNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Partition(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? _HierarchyDefaultRectNode.default : _ref$nodeComponent;
  var partition = (0, _d3Hierarchy.partition)();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);
  var data = partition(root);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(data));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left,
    className: (0, _classnames.default)('visx-partition', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "partition-node-" + i
    }, /*#__PURE__*/_react.default.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Partition.propTypes = {
  children: _propTypes.default.func,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  className: _propTypes.default.string,
  round: _propTypes.default.bool,
  padding: _propTypes.default.number
};