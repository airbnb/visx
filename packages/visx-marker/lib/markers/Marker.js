"use strict";

exports.__esModule = true;
exports.default = Marker;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["id", "markerWidth", "markerHeight", "markerUnits", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Marker(_ref) {
  var id = _ref.id,
    _ref$markerWidth = _ref.markerWidth,
    markerWidth = _ref$markerWidth === void 0 ? 3 : _ref$markerWidth,
    _ref$markerHeight = _ref.markerHeight,
    markerHeight = _ref$markerHeight === void 0 ? 3 : _ref$markerHeight,
    _ref$markerUnits = _ref.markerUnits,
    markerUnits = _ref$markerUnits === void 0 ? 'userSpaceOnUse' : _ref$markerUnits,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("marker", _extends({
    id: id,
    markerWidth: markerWidth,
    markerHeight: markerHeight,
    markerUnits: markerUnits
  }, restProps), children));
}
Marker.propTypes = {
  id: _propTypes.default.string.isRequired,
  size: _propTypes.default.number,
  markerWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  markerHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  markerUnits: _propTypes.default.string,
  refX: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  refY: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  strokeWidth: _propTypes.default.number,
  children: _propTypes.default.node.isRequired
};