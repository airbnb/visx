"use strict";

exports.__esModule = true;
exports.default = BaseGrid;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DataContext = _interopRequireDefault(require("../../context/DataContext"));
var _excluded = ["rows", "columns", "GridRowsComponent", "GridColumnsComponent"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/** Component that handles all  */
function BaseGrid(_ref) {
  var _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? true : _ref$rows,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? true : _ref$columns,
    GridRowsComponent = _ref.GridRowsComponent,
    GridColumnsComponent = _ref.GridColumnsComponent,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.default),
    theme = _useContext.theme,
    columnsScale = _useContext.xScale,
    rowsScale = _useContext.yScale,
    margin = _useContext.margin,
    innerWidth = _useContext.innerWidth,
    innerHeight = _useContext.innerHeight;
  var gridLineStyles = theme == null ? void 0 : theme.gridStyles;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, rows && rowsScale && innerWidth != null && /*#__PURE__*/_react.default.createElement(GridRowsComponent, _extends({
    left: margin == null ? void 0 : margin.left,
    lineStyle: gridLineStyles,
    width: innerWidth,
    scale: rowsScale
  }, props)), columns && columnsScale && innerHeight != null && /*#__PURE__*/_react.default.createElement(GridColumnsComponent, _extends({
    top: margin == null ? void 0 : margin.top,
    lineStyle: gridLineStyles,
    height: innerHeight,
    scale: columnsScale
  }, props)));
}
BaseGrid.propTypes = {
  rows: _propTypes.default.bool,
  columns: _propTypes.default.bool
};