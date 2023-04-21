"use strict";

exports.__esModule = true;
exports.default = Nodes;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _DefaultNode = _interopRequireDefault(require("./DefaultNode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Nodes(_ref) {
  var _ref$nodes = _ref.nodes,
    nodes = _ref$nodes === void 0 ? [] : _ref$nodes,
    _ref$nodeComponent = _ref.nodeComponent,
    nodeComponent = _ref$nodeComponent === void 0 ? _DefaultNode.default : _ref$nodeComponent,
    className = _ref.className,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? function (d) {
      return (d == null ? void 0 : d.x) || 0;
    } : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? function (d) {
      return (d == null ? void 0 : d.y) || 0;
    } : _ref$y;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, nodes.map(function (node, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "network-node-" + i,
      className: (0, _classnames.default)('visx-network-node', className),
      left: x(node),
      top: y(node)
    }, /*#__PURE__*/_react.default.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Nodes.propTypes = {
  nodes: _propTypes.default.array,
  className: _propTypes.default.string,
  x: _propTypes.default.func,
  y: _propTypes.default.func
};