'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Line = require('./src/shapes/Line');

var _Line2 = _interopRequireDefault(_Line);

var _LinePath = require('./src/shapes/LinePath');

var _LinePath2 = _interopRequireDefault(_LinePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Line: _Line2.default,
  LinePath: _LinePath2.default
};