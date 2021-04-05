"use strict";

exports.__esModule = true;
exports.default = withTooltip;

var _react = _interopRequireDefault(require("react"));

var _useTooltip = _interopRequireDefault(require("../hooks/useTooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function withTooltip(BaseComponent, containerProps, renderContainer) {
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
      return /*#__PURE__*/_react.default.createElement("div", props, children);
    };
  }

  var WrappedComponent = function WrappedComponent(props) {
    var tooltipProps = (0, _useTooltip.default)();
    return renderContainer( /*#__PURE__*/_react.default.createElement(BaseComponent, _extends({}, tooltipProps, props)), containerProps);
  };

  return WrappedComponent;
}