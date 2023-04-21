import _pt from "prop-types";
var _excluded = ["id", "children"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
/** Handles rendering of <defs> and <clipPath> elements for you, with any children you want. */
export default function ClipPath(_ref) {
  var id = _ref.id,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", _extends({
    id: id
  }, restProps), children));
}
ClipPath.propTypes = {
  id: _pt.string.isRequired,
  children: _pt.node
};