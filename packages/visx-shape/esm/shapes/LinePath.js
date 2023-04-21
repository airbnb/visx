var _excluded = ["children", "data", "x", "y", "fill", "className", "curve", "innerRef", "defined"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import { line } from '../util/D3ShapeFactories';
export default function LinePath(_ref) {
  var children = _ref.children,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    x = _ref.x,
    y = _ref.y,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
    className = _ref.className,
    curve = _ref.curve,
    innerRef = _ref.innerRef,
    _ref$defined = _ref.defined,
    defined = _ref$defined === void 0 ? function () {
      return true;
    } : _ref$defined,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = line({
    x: x,
    y: y,
    defined: defined,
    curve: curve
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends({
    ref: innerRef,
    className: cx('visx-linepath', className),
    d: path(data) || '',
    fill: fill
    // without this a datum surrounded by nulls will not be visible
    // https://github.com/d3/d3-shape#line_defined
    ,
    strokeLinecap: "round"
  }, restProps));
}