"use strict";

exports.__esModule = true;
exports.default = Pattern;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pattern(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("pattern", {
    id: id,
    width: width,
    height: height,
    patternUnits: "userSpaceOnUse"
  }, children));
}

Pattern.propTypes = {
  id: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  children: _propTypes.default.node.isRequired
};