var _excluded = ["id", "size", "strokeWidth"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import Marker from './Marker';
export default function MarkerArrow(_ref) {
  var id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 9 : _ref$size,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var max = size + strokeWidth * 2;
  var midX = size;
  var midY = max / 2;
  var points = "0 0, " + size + " " + size / 2 + ", 0 " + size;
  return /*#__PURE__*/React.createElement(Marker, _extends({
    id: id,
    markerWidth: max,
    markerHeight: max,
    refX: midX,
    refY: midY,
    orient: "auto",
    markerUnits: "strokeWidth",
    fill: "none",
    strokeWidth: strokeWidth
  }, restProps), /*#__PURE__*/React.createElement("g", {
    transform: "translate(" + strokeWidth + ", " + strokeWidth + ")"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: points
  })));
}