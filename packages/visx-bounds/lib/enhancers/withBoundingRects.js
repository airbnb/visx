"use strict";

exports.__esModule = true;
exports.default = withBoundingRects;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
};

function withBoundingRects(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$PureComponent) {
    _inheritsLoose(WrappedComponent, _React$PureComponent);

    function WrappedComponent(props) {
      var _this;

      _this = _React$PureComponent.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "node", void 0);

      _this.state = {
        rect: undefined,
        parentRect: undefined
      };
      _this.getRects = _this.getRects.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.node = _reactDom.default.findDOMNode(this);
      this.setState(function () {
        return _this2.getRects();
      });
    };

    _proto.getRects = function getRects() {
      if (!this.node) return this.state;
      var node = this.node;
      var parentNode = node.parentNode;
      var rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;
      var parentRect = parentNode && parentNode.getBoundingClientRect ? parentNode.getBoundingClientRect() : emptyRect;
      return {
        rect: rect,
        parentRect: parentRect
      };
    };

    _proto.render = function render() {
      return /*#__PURE__*/_react.default.createElement(BaseComponent, _extends({
        getRects: this.getRects
      }, this.state, this.props));
    };

    return WrappedComponent;
  }(_react.default.PureComponent), _defineProperty(_class, "displayName", "withBoundingRects(" + (BaseComponent.displayName || '') + ")"), _temp;
}