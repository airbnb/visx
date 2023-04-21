import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
export default function AnchorLine(_ref) {
  var anchorLineOrientation = _ref.anchorLineOrientation,
    anchorLineStroke = _ref.anchorLineStroke,
    verticalAnchor = _ref.verticalAnchor,
    horizontalAnchor = _ref.horizontalAnchor,
    width = _ref.width,
    height = _ref.height;
  var backgroundOutline = {
    stroke: anchorLineStroke,
    strokeWidth: 2
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, anchorLineOrientation === 'horizontal' && verticalAnchor === 'start' && /*#__PURE__*/React.createElement("line", _extends({}, backgroundOutline, {
    x1: 0,
    x2: width,
    y1: 0,
    y2: 0
  })), anchorLineOrientation === 'horizontal' && verticalAnchor === 'end' && /*#__PURE__*/React.createElement("line", _extends({}, backgroundOutline, {
    x1: 0,
    x2: width,
    y1: height,
    y2: height
  })), anchorLineOrientation === 'vertical' && horizontalAnchor === 'start' && /*#__PURE__*/React.createElement("line", _extends({}, backgroundOutline, {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: height
  })), anchorLineOrientation === 'vertical' && horizontalAnchor === 'end' && /*#__PURE__*/React.createElement("line", _extends({}, backgroundOutline, {
    x1: width,
    x2: width,
    y1: 0,
    y2: height
  })));
}
AnchorLine.propTypes = {
  anchorLineOrientation: _pt.oneOf(['horizontal', 'vertical']).isRequired,
  anchorLineStroke: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired
};