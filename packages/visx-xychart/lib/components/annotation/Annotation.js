"use strict";

exports.__esModule = true;
exports.default = Annotation;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _annotation = require("@visx/annotation");
var _BaseAnnotation = _interopRequireDefault(require("./private/BaseAnnotation"));
var _excluded = ["editable"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Annotation(_ref) {
  var editable = _ref.editable,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_BaseAnnotation.default, _extends({
    AnnotationComponent: editable ? _annotation.EditableAnnotation : _annotation.Annotation
  }, props));
}
Annotation.propTypes = {
  editable: _propTypes.default.bool
};