var _excluded = ["children", "x", "x0", "x1", "y", "y0", "y1", "data", "defined", "className", "curve", "innerRef"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { area } from '../util/D3ShapeFactories';
export default function Area(_ref) {
  var children = _ref.children,
    x = _ref.x,
    x0 = _ref.x0,
    x1 = _ref.x1,
    y = _ref.y,
    y0 = _ref.y0,
    y1 = _ref.y1,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$defined = _ref.defined,
    defined = _ref$defined === void 0 ? function () {
      return true;
    } : _ref$defined,
    className = _ref.className,
    curve = _ref.curve,
    innerRef = _ref.innerRef,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = area({
    x: x,
    x0: x0,
    x1: x1,
    y: y,
    y0: y0,
    y1: y1,
    defined: defined,
    curve: curve
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends({
    ref: innerRef,
    className: cx('visx-area', className),
    d: path(data) || ''
  }, restProps));
}