import _pt from "prop-types";
var _excluded = ["editable"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import { Annotation as VisxAnnotation, EditableAnnotation as VisxEditableAnnotation } from '@visx/annotation';
import BaseAnnotation from './private/BaseAnnotation';
export default function Annotation(_ref) {
  var editable = _ref.editable,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(BaseAnnotation, _extends({
    AnnotationComponent: editable ? VisxEditableAnnotation : VisxAnnotation
  }, props));
}
Annotation.propTypes = {
  editable: _pt.bool
};