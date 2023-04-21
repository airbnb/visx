import _pt from "prop-types";
var _excluded = ["id", "markerWidth", "markerHeight", "markerUnits", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
export default function Marker(_ref) {
  var id = _ref.id,
    _ref$markerWidth = _ref.markerWidth,
    markerWidth = _ref$markerWidth === void 0 ? 3 : _ref$markerWidth,
    _ref$markerHeight = _ref.markerHeight,
    markerHeight = _ref$markerHeight === void 0 ? 3 : _ref$markerHeight,
    _ref$markerUnits = _ref.markerUnits,
    markerUnits = _ref$markerUnits === void 0 ? 'userSpaceOnUse' : _ref$markerUnits,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", _extends({
    id: id,
    markerWidth: markerWidth,
    markerHeight: markerHeight,
    markerUnits: markerUnits
  }, restProps), children));
}
Marker.propTypes = {
  id: _pt.string.isRequired,
  size: _pt.number,
  markerWidth: _pt.oneOfType([_pt.string, _pt.number]),
  markerHeight: _pt.oneOfType([_pt.string, _pt.number]),
  markerUnits: _pt.string,
  refX: _pt.oneOfType([_pt.string, _pt.number]),
  refY: _pt.oneOfType([_pt.string, _pt.number]),
  strokeWidth: _pt.number,
  children: _pt.node.isRequired
};