'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Demo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _shape = require('@vx/shape');

var _shape2 = _interopRequireDefault(_shape);

var _point = require('@vx/point');

var _point2 = _interopRequireDefault(_point);

var _axis = require('@vx/axis');

var _axis2 = _interopRequireDefault(_axis);

var _scale = require('@vx/scale');

var _scale2 = _interopRequireDefault(_scale);

var _mockData = require('@vx/mock-data');

var _mockData2 = _interopRequireDefault(_mockData);

var _group = require('@vx/group');

var _group2 = _interopRequireDefault(_group);

var _curve = require('@vx/curve');

var _curve2 = _interopRequireDefault(_curve);

var _d3Array = require('d3-array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data1 = _mockData2.default.genDateValue(20);
var data2 = _mockData2.default.genDateValue(20);

function Demo() {
  var width = 800;
  var height = 400;
  var margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50
  };

  // bounds
  var xMax = width - margin.left - margin.right;
  var yMax = height - margin.top - margin.bottom;

  // accessors
  var x = function x(d) {
    return d.date;
  };
  var y = function y(d) {
    return d.value;
  };

  // scales
  var xScale = _scale2.default.scaleTime({
    range: [0, xMax],
    domain: (0, _d3Array.extent)(data1.concat(data2), x)
  });
  var yScale = _scale2.default.scaleLinear({
    range: [yMax, 0],
    domain: [0, (0, _d3Array.max)(data1.concat(data2), y)],
    nice: true
  });

  return _react2.default.createElement(
    'svg',
    { width: width, height: height },
    _react2.default.createElement(_axis2.default.AxisLeft, {
      top: margin.top,
      left: margin.left,
      scale: yScale,
      hideZero: true
    }),
    _react2.default.createElement(
      _group2.default,
      {
        top: margin.top,
        left: margin.left
      },
      _react2.default.createElement(_shape2.default.LinePath, {
        data: data1,
        xScale: xScale,
        yScale: yScale,
        x: x,
        y: y,
        stroke: { color: '#6A7DD3', width: 2 },
        points: true
      }),
      _react2.default.createElement(_shape2.default.LinePath, {
        data: data2,
        xScale: xScale,
        yScale: yScale,
        x: x,
        y: y,
        stroke: { width: 2, color: '#5A9C57', dasharray: "5,5" },
        curve: _curve2.default.cardinal
      })
    ),
    _react2.default.createElement(_axis2.default.AxisBottom, {
      top: height - margin.bottom,
      left: margin.left,
      scale: xScale
    })
  );
}