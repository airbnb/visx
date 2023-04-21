import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import ShapeRect from '../../shapes/Rect';
import renderShape from '../../util/renderShape';
export default function LegendShape(_ref) {
  var _ref$shape = _ref.shape,
    shape = _ref$shape === void 0 ? ShapeRect : _ref$shape,
    width = _ref.width,
    height = _ref.height,
    margin = _ref.margin,
    label = _ref.label,
    item = _ref.item,
    itemIndex = _ref.itemIndex,
    fill = _ref.fill,
    size = _ref.size,
    shapeStyle = _ref.shapeStyle;
  return /*#__PURE__*/React.createElement("div", {
    className: "visx-legend-shape",
    style: {
      display: 'flex',
      width: size ? size(_extends({}, label)) : width,
      height: size ? size(_extends({}, label)) : height,
      margin: margin
    }
  }, renderShape({
    shape: shape,
    item: item,
    itemIndex: itemIndex,
    label: label,
    width: width,
    height: height,
    fill: fill,
    shapeStyle: shapeStyle
  }));
}
LegendShape.propTypes = {
  itemIndex: _pt.number.isRequired,
  margin: _pt.oneOfType([_pt.string, _pt.number]),
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};