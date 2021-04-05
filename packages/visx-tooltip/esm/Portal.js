import _pt from "prop-types";

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';

/** Render within a portal using a declarative component API. */
var Portal = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Portal, _React$PureComponent);

  function Portal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    return _this;
  }

  var _proto = Portal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.node && document.body) {
      document.body.removeChild(this.node);
      delete this.node;
    }
  };

  _proto.render = function render() {
    // SSR check
    if (!this.node && typeof document !== 'undefined') {
      this.node = document.createElement('div');
      if (this.props.zIndex != null) this.node.style.zIndex = "" + this.props.zIndex;
      document.body.append(this.node);
    }

    if (!this.node) {
      return null;
    }

    return /*#__PURE__*/ReactDOM.createPortal(this.props.children, this.node);
  };

  return Portal;
}(React.PureComponent);

_defineProperty(Portal, "propTypes", {
  zIndex: _pt.number
});

export { Portal as default };