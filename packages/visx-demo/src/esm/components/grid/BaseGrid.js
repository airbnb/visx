import _pt from "prop-types";
var _excluded = ["rows", "columns", "GridRowsComponent", "GridColumnsComponent"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
/** Component that handles all  */
export default function BaseGrid(_ref) {
  var _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? true : _ref$rows,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? true : _ref$columns,
    GridRowsComponent = _ref.GridRowsComponent,
    GridColumnsComponent = _ref.GridColumnsComponent,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    theme = _useContext.theme,
    columnsScale = _useContext.xScale,
    rowsScale = _useContext.yScale,
    margin = _useContext.margin,
    innerWidth = _useContext.innerWidth,
    innerHeight = _useContext.innerHeight;
  var gridLineStyles = theme == null ? void 0 : theme.gridStyles;
  return /*#__PURE__*/React.createElement(React.Fragment, null, rows && rowsScale && innerWidth != null && /*#__PURE__*/React.createElement(GridRowsComponent, _extends({
    left: margin == null ? void 0 : margin.left,
    lineStyle: gridLineStyles,
    width: innerWidth,
    scale: rowsScale
  }, props)), columns && columnsScale && innerHeight != null && /*#__PURE__*/React.createElement(GridColumnsComponent, _extends({
    top: margin == null ? void 0 : margin.top,
    lineStyle: gridLineStyles,
    height: innerHeight,
    scale: columnsScale
  }, props)));
}
BaseGrid.propTypes = {
  rows: _pt.bool,
  columns: _pt.bool
};