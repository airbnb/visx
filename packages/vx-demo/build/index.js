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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_axis2.default);

function Demo() {
  var width = 800;
  var height = 400;
  var margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50
  };

  var xMax = width - margin.left - margin.right;
  var yMax = height - margin.top - margin.bottom;
  return _react2.default.createElement(
    'svg',
    { width: 500, height: 300 },
    _react2.default.createElement(_shape2.default.Line, {
      from: new _point2.default({ x: 0, y: 0 }),
      to: new _point2.default({ x: 200, y: 200 }),
      stroke: {
        color: 'steelblue',
        width: 2,
        dasharray: '5,5'
      }
    })
  );
}