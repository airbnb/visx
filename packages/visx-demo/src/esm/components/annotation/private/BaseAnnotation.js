import _pt from "prop-types";
var _excluded = ["AnnotationComponent", "children", "datum", "dataKey", "xAccessor", "yAccessor", "dx", "dy"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useMemo } from 'react';
import { coerceNumber } from '@visx/scale';
import DataContext from '../../../context/DataContext';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import isValidNumber from '../../../typeguards/isValidNumber';
// used for auto-positioning
var minimumLabelDimension = 16;
export default function BaseAnnotation(_ref) {
  var _coerceNumber, _coerceNumber2;
  var AnnotationComponent = _ref.AnnotationComponent,
    children = _ref.children,
    datum = _ref.datum,
    dataKey = _ref.dataKey,
    propsXAccessor = _ref.xAccessor,
    propsYAccessor = _ref.yAccessor,
    _ref$dx = _ref.dx,
    propsDx = _ref$dx === void 0 ? 0 : _ref$dx,
    _ref$dy = _ref.dy,
    propsDy = _ref$dy === void 0 ? 0 : _ref$dy,
    annotationProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _ref2 = useContext(DataContext) || {},
    innerHeight = _ref2.innerHeight,
    innerWidth = _ref2.innerWidth,
    margin = _ref2.margin,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale,
    dataRegistry = _ref2.dataRegistry;
  var xBandWidth = useMemo(function () {
    return xScale ? getScaleBandwidth(xScale) : 0;
  }, [xScale]);
  var yBandWidth = useMemo(function () {
    return yScale ? getScaleBandwidth(yScale) : 0;
  }, [yScale]);
  if ((!propsXAccessor || !propsYAccessor) && !dataKey) {
    console.warn('[@visx/xychart/BaseAnnotation]: dataKey or x/yAccessors must be specified.');
    return null;
  }
  var registryEntry = propsXAccessor && propsYAccessor || dataKey == null ? null : dataRegistry == null ? void 0 : dataRegistry.get(dataKey);
  var xAccessor = propsXAccessor || (registryEntry == null ? void 0 : registryEntry.xAccessor);
  var yAccessor = propsYAccessor || (registryEntry == null ? void 0 : registryEntry.yAccessor);
  if (!xScale || !yScale || !innerWidth || !innerHeight || !xAccessor || !yAccessor || !margin) {
    return null;
  }
  var x = ((_coerceNumber = coerceNumber(xScale(xAccessor(datum)))) != null ? _coerceNumber : NaN) + xBandWidth / 2;
  var y = ((_coerceNumber2 = coerceNumber(yScale(yAccessor(datum)))) != null ? _coerceNumber2 : NaN) + yBandWidth / 2;
  var dx = x + propsDx + minimumLabelDimension > margin.left + innerWidth ? -propsDx : propsDx;
  var dy = y + propsDy + minimumLabelDimension > margin.top + innerHeight ? -propsDy : propsDy;
  return isValidNumber(x) && isValidNumber(y) ? /*#__PURE__*/React.createElement(AnnotationComponent, _extends({
    width: innerWidth,
    height: innerHeight
  }, annotationProps, {
    x: x,
    y: y,
    dx: dx,
    dy: dy
  }), children) : null;
}
BaseAnnotation.propTypes = {
  dataKey: _pt.string,
  xAccessor: _pt.func,
  yAccessor: _pt.func
};