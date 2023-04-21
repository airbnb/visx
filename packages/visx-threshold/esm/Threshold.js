import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import cx from 'classnames';
import { Area } from '@visx/shape';
import { ClipPath } from '@visx/clip-path';
export default function Threshold(_ref) {
  var className = _ref.className,
    curve = _ref.curve,
    clipAboveTo = _ref.clipAboveTo,
    clipBelowTo = _ref.clipBelowTo,
    data = _ref.data,
    defined = _ref.defined,
    x = _ref.x,
    y0 = _ref.y0,
    y1 = _ref.y1,
    aboveAreaProps = _ref.aboveAreaProps,
    belowAreaProps = _ref.belowAreaProps,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id;
  return /*#__PURE__*/React.createElement("g", {
    className: cx('visx-threshold', className)
  }, /*#__PURE__*/React.createElement(Area, {
    curve: curve,
    data: data,
    x: x,
    y1: y1,
    defined: defined
  }, function (_ref2) {
    var path = _ref2.path;
    // TS cannot infer the correct method overload
    var belowPath = null;
    var abovePath = null;
    if (typeof clipBelowTo === 'number') belowPath = path.y0(clipBelowTo)(data);else belowPath = path.y0(clipBelowTo)(data);
    if (typeof clipAboveTo === 'number') abovePath = path.y0(clipAboveTo)(data);else abovePath = path.y0(clipAboveTo)(data);
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement(ClipPath, {
      id: "threshold-clip-below-" + id
    }, /*#__PURE__*/React.createElement("path", {
      d: belowPath || ''
    })), /*#__PURE__*/React.createElement(ClipPath, {
      id: "threshold-clip-above-" + id
    }, /*#__PURE__*/React.createElement("path", {
      d: abovePath || ''
    })));
  }), /*#__PURE__*/React.createElement(Area, _extends({
    curve: curve,
    data: data,
    defined: defined,
    x: x,
    y0: y0,
    y1: y1,
    strokeWidth: 0,
    clipPath: "url(#threshold-clip-below-" + id + ")"
  }, belowAreaProps)), /*#__PURE__*/React.createElement(Area, _extends({
    curve: curve,
    data: data,
    defined: defined,
    x: x,
    y0: y0,
    y1: y1,
    strokeWidth: 0,
    clipPath: "url(#threshold-clip-above-" + id + ")"
  }, aboveAreaProps)));
}
Threshold.propTypes = {
  className: _pt.string,
  clipAboveTo: _pt.oneOfType([_pt.func, _pt.number]).isRequired,
  clipBelowTo: _pt.oneOfType([_pt.func, _pt.number]).isRequired,
  id: _pt.string.isRequired,
  data: _pt.array.isRequired,
  defined: _pt.func,
  x: _pt.oneOfType([_pt.func, _pt.number]).isRequired,
  y0: _pt.oneOfType([_pt.func, _pt.number]).isRequired,
  y1: _pt.oneOfType([_pt.func, _pt.number]).isRequired
};