"use strict";

exports.__esModule = true;
exports.default = HierarchyDefaultRectNode;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HierarchyDefaultRectNode(_ref) {
  var _ref$node = _ref.node,
      x0 = _ref$node.x0,
      x1 = _ref$node.x1,
      y0 = _ref$node.y0,
      y1 = _ref$node.y1;
  return /*#__PURE__*/_react.default.createElement("rect", {
    x: x0,
    y: y0,
    width: Math.abs(x1 - x0),
    height: Math.abs(y1 - y0),
    fill: "#21D4FD"
  });
}

HierarchyDefaultRectNode.propTypes = {
  node: _propTypes.default.shape({
    x0: _propTypes.default.number.isRequired,
    x1: _propTypes.default.number.isRequired,
    y0: _propTypes.default.number.isRequired,
    y1: _propTypes.default.number.isRequired
  }).isRequired
};