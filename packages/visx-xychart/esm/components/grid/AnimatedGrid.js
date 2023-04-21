import _pt from "prop-types";
var _excluded = ["animationTrajectory"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import AnimatedGridRows from '@visx/react-spring/lib/grid/AnimatedGridRows';
import AnimatedGridColumns from '@visx/react-spring/lib/grid/AnimatedGridColumns';
import BaseGrid from './BaseGrid';
export default function AnimatedGrid(_ref) {
  var animationTrajectory = _ref.animationTrajectory,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var RowsComponent = useMemo(function () {
    return function RowsFC(rowProps) {
      return /*#__PURE__*/React.createElement(AnimatedGridRows, _extends({}, rowProps, {
        animationTrajectory: animationTrajectory
      }));
    };
  }, [animationTrajectory]);
  var ColumnsComponent = useMemo(function () {
    return function ColumnsFC(rowProps) {
      return /*#__PURE__*/React.createElement(AnimatedGridColumns, _extends({}, rowProps, {
        animationTrajectory: animationTrajectory
      }));
    };
  }, [animationTrajectory]);
  return /*#__PURE__*/React.createElement(BaseGrid, _extends({
    GridRowsComponent: RowsComponent,
    GridColumnsComponent: ColumnsComponent
  }, props));
}