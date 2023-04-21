"use strict";

exports.__esModule = true;
exports.default = ClipPath;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["id", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/** Handles rendering of <defs> and <clipPath> elements for you, with any children you want. */
function ClipPath(_ref) {
  var id = _ref.id,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("clipPath", _extends({
    id: id
  }, restProps), children));
}
ClipPath.propTypes = {
  id: _propTypes.default.string.isRequired,
  children: _propTypes.default.node
};