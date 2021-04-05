"use strict";

exports.__esModule = true;
exports.default = Grid;

var _react = _interopRequireDefault(require("react"));

var _GridRows = _interopRequireDefault(require("@visx/grid/lib/grids/GridRows"));

var _GridColumns = _interopRequireDefault(require("@visx/grid/lib/grids/GridColumns"));

var _BaseGrid = _interopRequireDefault(require("./BaseGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Grid(props) {
  return /*#__PURE__*/_react.default.createElement(_BaseGrid.default, _extends({
    GridRowsComponent: _GridRows.default,
    GridColumnsComponent: _GridColumns.default
  }, props));
}