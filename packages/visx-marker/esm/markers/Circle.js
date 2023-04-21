var _excluded = ["id", "size", "strokeWidth"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import Marker from './Marker';
export default function MarkerCircle(_ref) {
  var id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 9 : _ref$size,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var diameter = size * 2;
  var bounds = diameter + strokeWidth;
  var mid = bounds / 2;
  return /*#__PURE__*/React.createElement(Marker, _extends({
    id: id,
    markerWidth: bounds,
    markerHeight: bounds,
    refX: 0,
    refY: mid,
    orient: "auto-start-reverse",
    markerUnits: "strokeWidth",
    strokeWidth: strokeWidth
  }, restProps), /*#__PURE__*/React.createElement("circle", {
    r: size,
    cx: mid,
    cy: mid
  }));
}