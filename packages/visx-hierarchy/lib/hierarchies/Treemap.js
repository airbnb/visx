"use strict";

exports.__esModule = true;
exports.default = Treemap;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

var _d3Hierarchy = require("d3-hierarchy");

var _HierarchyDefaultRectNode = _interopRequireDefault(require("../HierarchyDefaultRectNode"));

var _setNumOrNumAccessor = _interopRequireDefault(require("../utils/setNumOrNumAccessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/unbound-method */
function Treemap(_ref) {
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
      nodeComponent = _ref$nodeComponent === void 0 ? _HierarchyDefaultRectNode.default : _ref$nodeComponent;
  var treemap = (0, _d3Hierarchy.treemap)();
  if (tile) treemap.tile(tile);
  if (size) treemap.size(size);
  if (round) treemap.round(round);
  if (padding) (0, _setNumOrNumAccessor.default)(treemap.padding, padding);
  if (paddingInner) (0, _setNumOrNumAccessor.default)(treemap.paddingInner, paddingInner);
  if (paddingOuter) (0, _setNumOrNumAccessor.default)(treemap.paddingOuter, paddingOuter);
  if (paddingTop) (0, _setNumOrNumAccessor.default)(treemap.paddingTop, paddingTop);
  if (paddingRight) (0, _setNumOrNumAccessor.default)(treemap.paddingRight, paddingRight);
  if (paddingBottom) (0, _setNumOrNumAccessor.default)(treemap.paddingBottom, paddingBottom);
  if (paddingLeft) (0, _setNumOrNumAccessor.default)(treemap.paddingLeft, paddingLeft);
  var data = treemap(root);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children(data));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    top: top,
    left: left,
    className: (0, _classnames.default)('visx-treemap', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "treemap-node-" + i
    }, /*#__PURE__*/_react.default.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Treemap.propTypes = {
  children: _propTypes.default.func,
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  className: _propTypes.default.string,
  round: _propTypes.default.bool,
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingInner: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingOuter: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingRight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingBottom: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  paddingLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func])
};