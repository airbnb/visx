import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import debounce from 'lodash/debounce';
import React from 'react';
export default function withScreenSize(BaseComponent) {
  var _class;
  return _class = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(WrappedComponent, _React$Component);
    function WrappedComponent() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.state = {
        screenWidth: undefined,
        screenHeight: undefined
      };
      _this.resize = debounce(
      // eslint-disable-next-line unicorn/consistent-function-scoping
      function () {
        _this.setState(function /** prevState, props */
        () {
          return {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
          };
        });
      }, _this.props.windowResizeDebounceTime, {
        leading: _this.props.enableDebounceLeadingCall
      });
      return _this;
    }
    var _proto = WrappedComponent.prototype;
    _proto.componentDidMount = function componentDidMount() {
      window.addEventListener('resize', this.resize, false);
      this.resize();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      window.removeEventListener('resize', this.resize, false);
      this.resize.cancel();
    };
    _proto.render = function render() {
      var _this$state = this.state,
        screenWidth = _this$state.screenWidth,
        screenHeight = _this$state.screenHeight;
      return screenWidth == null || screenHeight == null ? null : /*#__PURE__*/React.createElement(BaseComponent, _extends({
        screenWidth: screenWidth,
        screenHeight: screenHeight
      }, this.props));
    };
    return WrappedComponent;
  }(React.Component), _class.propTypes = {
    screenWidth: _pt.number,
    screenHeight: _pt.number
  }, _class.defaultProps = {
    windowResizeDebounceTime: 300,
    enableDebounceLeadingCall: true
  }, _class;
}