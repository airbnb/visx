import _pt from "prop-types";
var _excluded = ["polygon", "className", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
export default function VoronoiPolygon(_ref) {
  var polygon = _ref.polygon,
    className = _ref.className,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (!polygon) return null;
  var path = "M" + polygon.join('L') + "Z";
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path,
    polygon: polygon
  }));
  return /*#__PURE__*/React.createElement("path", _extends({
    className: cx('visx-voronoi-polygon', className),
    d: path
  }, restProps));
}
VoronoiPolygon.propTypes = {
  children: _pt.func,
  className: _pt.string,
  polygon: _pt.array
};