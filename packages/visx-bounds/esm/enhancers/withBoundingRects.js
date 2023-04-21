function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/* eslint react/no-did-mount-set-state: 0, react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
var emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
};
export default function withBoundingRects(BaseComponent) {
  var _class;
  return _class = /*#__PURE__*/function (_React$PureComponent) {
    _inheritsLoose(WrappedComponent, _React$PureComponent);
    function WrappedComponent(props) {
      var _this;
      _this = _React$PureComponent.call(this, props) || this;
      _this.state = {
        rect: undefined,
        parentRect: undefined
      };
      _this.nodeRef = /*#__PURE__*/React.createRef();
      _this.getRects = _this.getRects.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = WrappedComponent.prototype;
    _proto.componentDidMount = function componentDidMount() {
      var _this$nodeRef,
        _this2 = this;
      this.node = (_this$nodeRef = this.nodeRef) != null && _this$nodeRef.current ? this.nodeRef.current : ReactDOM.findDOMNode(this);
      this.setState(function () {
        return _this2.getRects();
      });
    };
    _proto.getRects = function getRects() {
      if (!this.node) return this.state;
      var node = this.node;
      var parentNode = node.parentNode;
      var rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;
      var parentRect = parentNode != null && parentNode.getBoundingClientRect ? parentNode.getBoundingClientRect() : emptyRect;
      return {
        rect: rect,
        parentRect: parentRect
      };
    };
    _proto.render = function render() {
      return /*#__PURE__*/React.createElement(BaseComponent, _extends({
        nodeRef: this.nodeRef,
        getRects: this.getRects
      }, this.state, this.props));
    };
    return WrappedComponent;
  }(React.PureComponent), _class.displayName = "withBoundingRects(" + (BaseComponent.displayName || '') + ")", _class;
}