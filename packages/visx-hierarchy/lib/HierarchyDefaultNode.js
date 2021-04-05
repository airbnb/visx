"use strict";

exports.__esModule = true;
exports.default = HierarchyDefaultNode;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HierarchyDefaultNode(_ref) {
  var _ref$node = _ref.node,
      node = _ref$node === void 0 ? {
    x: 0,
    y: 0,
    r: 15
  } : _ref$node;
  return /*#__PURE__*/_react.default.createElement("circle", {
    cx: node.x,
    cy: node.y,
    r: node.r || 15,
    fill: "#21D4FD"
  });
}

HierarchyDefaultNode.propTypes = {
  node: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired,
    r: _propTypes.default.number
  })
};