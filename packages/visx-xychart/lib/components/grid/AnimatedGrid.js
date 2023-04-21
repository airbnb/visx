"use strict";

exports.__esModule = true;
exports.default = AnimatedGrid;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _AnimatedGridRows = _interopRequireDefault(require("@visx/react-spring/lib/grid/AnimatedGridRows"));
var _AnimatedGridColumns = _interopRequireDefault(require("@visx/react-spring/lib/grid/AnimatedGridColumns"));
var _BaseGrid = _interopRequireDefault(require("./BaseGrid"));
var _excluded = ["animationTrajectory"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AnimatedGrid(_ref) {
  var animationTrajectory = _ref.animationTrajectory,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var RowsComponent = (0, _react.useMemo)(function () {
    return function RowsFC(rowProps) {
      return /*#__PURE__*/_react.default.createElement(_AnimatedGridRows.default, _extends({}, rowProps, {
        animationTrajectory: animationTrajectory
      }));
    };
  }, [animationTrajectory]);
  var ColumnsComponent = (0, _react.useMemo)(function () {
    return function ColumnsFC(rowProps) {
      return /*#__PURE__*/_react.default.createElement(_AnimatedGridColumns.default, _extends({}, rowProps, {
        animationTrajectory: animationTrajectory
      }));
    };
  }, [animationTrajectory]);
  return /*#__PURE__*/_react.default.createElement(_BaseGrid.default, _extends({
    GridRowsComponent: RowsComponent,
    GridColumnsComponent: ColumnsComponent
  }, props));
}