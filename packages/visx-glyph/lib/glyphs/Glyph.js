"use strict";

exports.__esModule = true;
exports.default = Glyph;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Glyph(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: (0, _classnames.default)('visx-glyph', className),
    top: top,
    left: left
  }, children);
}

Glyph.propTypes = {
  top: _propTypes.default.number,
  left: _propTypes.default.number,
  className: _propTypes.default.string,
  children: _propTypes.default.node
};