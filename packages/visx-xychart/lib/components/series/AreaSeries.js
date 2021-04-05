"use strict";

exports.__esModule = true;
exports.default = AreaSeries;

var _react = _interopRequireDefault(require("react"));

var _BaseAreaSeries = _interopRequireDefault(require("./private/BaseAreaSeries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AreaSeries(props) {
  // @TODO currently generics for non-SeriesProps are not passed correctly in withRegisteredData HOC
  // @ts-expect-error
  return /*#__PURE__*/_react.default.createElement(_BaseAreaSeries.default, props);
}