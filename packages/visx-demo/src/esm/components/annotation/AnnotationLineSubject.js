import _pt from "prop-types";
var _excluded = ["min", "max"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import { LineSubject as BaseLineSubject } from '@visx/annotation';
import DataContext from '../../context/DataContext';
/** AnnotationLineSubject which provides color and dimensions from context. */
export default function AnnotationLineSubject(_ref) {
  var _ref2, _margin$left, _margin$top;
  var min = _ref.min,
    max = _ref.max,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    theme = _useContext.theme,
    margin = _useContext.margin,
    _useContext$innerHeig = _useContext.innerHeight,
    innerHeight = _useContext$innerHeig === void 0 ? 0 : _useContext$innerHeig,
    _useContext$innerWidt = _useContext.innerWidth,
    innerWidth = _useContext$innerWidt === void 0 ? 0 : _useContext$innerWidt;
  return /*#__PURE__*/React.createElement(BaseLineSubject, _extends({
    stroke: theme == null ? void 0 : theme.axisStyles.x.bottom.axisLine.stroke,
    min: (_ref2 = min != null ? min : props.orientation === 'horizontal' ? margin == null ? void 0 : margin.left : margin == null ? void 0 : margin.top) != null ? _ref2 : 0,
    max: max != null ? max : props.orientation === 'horizontal' ? ((_margin$left = margin == null ? void 0 : margin.left) != null ? _margin$left : 0) + innerWidth : ((_margin$top = margin == null ? void 0 : margin.top) != null ? _margin$top : 0) + innerHeight
  }, props));
}
AnnotationLineSubject.propTypes = {
  min: _pt.number,
  max: _pt.number
};