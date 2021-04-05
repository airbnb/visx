"use strict";

exports.__esModule = true;
exports.default = Pack;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _d3Hierarchy = require("d3-hierarchy");

var _HierarchyDefaultNode = _interopRequireDefault(require("../HierarchyDefaultNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pack(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      radius = _ref.radius,
      size = _ref.size,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? _HierarchyDefaultNode.default : _ref$nodeComponent;
  var pack = (0, _d3Hierarchy.pack)();
  if (size) pack.size(size);
  if (radius !== undefined) pack.radius(radius);
  if (padding) pack.padding(padding);
  var data = pack(root);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(data));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left,
    className: (0, _classnames.default)('visx-pack', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "pack-node-" + i
    }, /*#__PURE__*/_react.default.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Pack.propTypes = {
  children: _propTypes.default.func,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  className: _propTypes.default.string,
  radius: _propTypes.default.func,
  padding: _propTypes.default.number
};