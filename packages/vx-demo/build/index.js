'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Demo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mockData = require('@vx/mock-data');

var _mockData2 = _interopRequireDefault(_mockData);

var _curve = require('@vx/curve');

var _curve2 = _interopRequireDefault(_curve);

var _SimpleLineChart = require('./demos/charts/SimpleLineChart');

var _SimpleLineChart2 = _interopRequireDefault(_SimpleLineChart);

var _SimpleAreaChart = require('./demos/charts/SimpleAreaChart');

var _SimpleAreaChart2 = _interopRequireDefault(_SimpleAreaChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Demo() {
  var data1 = _mockData2.default.genDateValue(20);
  var data2 = _mockData2.default.genDateValue(20);

  var width = 800;
  var height = 400;
  var margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_SimpleLineChart2.default, {
      width: width,
      height: height,
      margin: margin,
      dataset: [{
        data: data1,
        chart: {
          stroke: '#6A7DD3',
          strokeWidth: 4,
          backgroundColor: 'white'
        }
      }]
    }),
    _react2.default.createElement(_SimpleAreaChart2.default, {
      width: width,
      height: height,
      margin: margin
    })
  );
}