"use strict";

exports.__esModule = true;
exports.default = Graph;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _group = require("@visx/group");

var _Links = _interopRequireDefault(require("./Links"));

var _Nodes = _interopRequireDefault(require("./Nodes"));

var _DefaultNode = _interopRequireDefault(require("./DefaultNode"));

var _DefaultLink = _interopRequireDefault(require("./DefaultLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Graph(_ref) {
  var graph = _ref.graph,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? _DefaultLink.default : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? _DefaultNode.default : _ref$nodeComponent,
      top = _ref.top,
      left = _ref.left;
  return graph ? /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left
  }, /*#__PURE__*/_react.default.createElement(_Links.default, {
    links: graph.links,
    linkComponent: linkComponent
  }), /*#__PURE__*/_react.default.createElement(_Nodes.default, {
    nodes: graph.nodes,
    nodeComponent: nodeComponent
  })) : null;
}

Graph.propTypes = {
  top: _propTypes.default.number,
  left: _propTypes.default.number
};