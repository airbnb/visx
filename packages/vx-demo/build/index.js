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

var _SimpleLineWithGlyphsChart = require('./demos/charts/SimpleLineWithGlyphsChart');

var _SimpleLineWithGlyphsChart2 = _interopRequireDefault(_SimpleLineWithGlyphsChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Demo() {
  var data1 = _mockData2.default.genDateValue(20);
  var data2 = _mockData2.default.genDateValue(20);

  var width = 800;
  var height = 400;
  var margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'vx | ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/hshoff/vx' },
        'https://github.com/hshoff/vx'
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'A collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization and react for updating the DOM.',
      _react2.default.createElement('br', null),
      _react2.default.createElement('br', null),
      'Below are some simple examples of composing vx components to make reusable charts. They\'re responsive too.',
      _react2.default.createElement('br', null),
      _react2.default.createElement('br', null),
      'Super beta. Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+).'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/hshoff/vx/tree/master/packages/vx-demo/src' },
        'view source'
      )
    ),
    _react2.default.createElement(
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
      })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_SimpleAreaChart2.default, {
        width: width,
        height: height,
        margin: margin
      })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_SimpleLineWithGlyphsChart2.default, {
        width: width,
        height: height,
        margin: margin,
        dataset: [{
          data: data2,
          chart: {
            stroke: '#b531ce',
            strokeWidth: 4,
            backgroundColor: 'white'
          }
        }]
      })
    )
  );
}