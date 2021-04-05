function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import useTooltip from '../hooks/useTooltip';
export default function withTooltip(BaseComponent, containerProps, renderContainer) {
  if (containerProps === void 0) {
    containerProps = {
      style: {
        position: 'relative',
        width: 'inherit',
        height: 'inherit'
      }
    };
  }

  if (renderContainer === void 0) {
    renderContainer = function renderContainer(children, props) {
      return /*#__PURE__*/React.createElement("div", props, children);
    };
  }

  var WrappedComponent = function WrappedComponent(props) {
    var tooltipProps = useTooltip();
    return renderContainer( /*#__PURE__*/React.createElement(BaseComponent, _extends({}, tooltipProps, props)), containerProps);
  };

  return WrappedComponent;
}