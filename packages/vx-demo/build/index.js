'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _shape = require('@vx/shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Demo() {
  return _react2.default.createElement(
    'svg',
    { width: 500, height: 300 },
    _react2.default.createElement(_shape.Line, {
      from: new Point({ x: 0, y: 0 }),
      to: new Point({ x: 200, y: 200 }),
      stroke: {
        color: '#000',
        width: 1,
        dasharray: ''
      }
    })
  );
}