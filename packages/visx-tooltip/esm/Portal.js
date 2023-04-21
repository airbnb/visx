import _pt from "prop-types";
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React from 'react';
import ReactDOM from 'react-dom';
/** Render within a portal using a declarative component API. */
var Portal = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Portal, _React$PureComponent);
  function Portal() {
    return _React$PureComponent.apply(this, arguments) || this;
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
Portal.propTypes = {
  zIndex: _pt.oneOfType([_pt.number, _pt.string])
};
export { Portal as default };