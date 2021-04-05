import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import debounce from 'lodash/debounce';
import ResizeObserver from 'resize-observer-polyfill';
var CONTAINER_STYLES = {
  width: '100%',
  height: '100%'
};
export default function withParentSize(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(WrappedComponent, _React$Component);

    function WrappedComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "state", {
        parentWidth: undefined,
        parentHeight: undefined
      });

      _defineProperty(_assertThisInitialized(_this), "animationFrameID", 0);

      _defineProperty(_assertThisInitialized(_this), "resizeObserver", void 0);

      _defineProperty(_assertThisInitialized(_this), "container", null);

      _defineProperty(_assertThisInitialized(_this), "setRef", function (ref) {
        _this.container = ref;
      });

      _defineProperty(_assertThisInitialized(_this), "resize", debounce(function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        _this.setState({
          parentWidth: width,
          parentHeight: height
        });
      }, _this.props.debounceTime, {
        leading: _this.props.enableDebounceLeadingCall
      }));

      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.resizeObserver = new ResizeObserver(function (entries
      /** , observer */
      ) {
        entries.forEach(function (entry) {
          var _entry$contentRect = entry.contentRect,
              width = _entry$contentRect.width,
              height = _entry$contentRect.height;
          _this2.animationFrameID = window.requestAnimationFrame(function () {
            _this2.resize({
              width: width,
              height: height
            });
          });
        });
      });
      if (this.container) this.resizeObserver.observe(this.container);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.cancelAnimationFrame(this.animationFrameID);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.resize.cancel();
    };

    _proto.render = function render() {
      var _this$props = this.props,
          initialWidth = _this$props.initialWidth,
          initialHeight = _this$props.initialHeight;
      var _this$state = this.state,
          _this$state$parentWid = _this$state.parentWidth,
          parentWidth = _this$state$parentWid === void 0 ? initialWidth : _this$state$parentWid,
          _this$state$parentHei = _this$state.parentHeight,
          parentHeight = _this$state$parentHei === void 0 ? initialHeight : _this$state$parentHei;
      return /*#__PURE__*/React.createElement("div", {
        style: CONTAINER_STYLES,
        ref: this.setRef
      }, parentWidth != null && parentHeight != null && /*#__PURE__*/React.createElement(BaseComponent, _extends({
        parentWidth: parentWidth,
        parentHeight: parentHeight
      }, this.props)));
    };

    return WrappedComponent;
  }(React.Component), _defineProperty(_class, "propTypes", {
    parentWidth: _pt.number,
    parentHeight: _pt.number,
    initialWidth: _pt.number,
    initialHeight: _pt.number
  }), _defineProperty(_class, "defaultProps", {
    debounceTime: 300,
    enableDebounceLeadingCall: true
  }), _temp;
}