"use strict";

exports.__esModule = true;
exports.default = Annotation;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _AnnotationContext = _interopRequireDefault(require("../context/AnnotationContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Annotation(_ref) {
  var x = _ref.x,
      y = _ref.y,
      dx = _ref.dx,
      dy = _ref.dy,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_AnnotationContext.default.Provider, {
    value: {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    }
  }, children);
}

Annotation.propTypes = {
  children: _propTypes.default.node.isRequired
};