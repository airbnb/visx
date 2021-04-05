function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import GridRows from '@visx/grid/lib/grids/GridRows';
import GridColumns from '@visx/grid/lib/grids/GridColumns';
import BaseGrid from './BaseGrid';
export default function Grid(props) {
  return /*#__PURE__*/React.createElement(BaseGrid, _extends({
    GridRowsComponent: GridRows,
    GridColumnsComponent: GridColumns
  }, props));
}