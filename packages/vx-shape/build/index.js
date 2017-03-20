'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Line = require('./shapes/Line');

var _Line2 = _interopRequireDefault(_Line);

var _LinePath = require('./shapes/LinePath');

var _LinePath2 = _interopRequireDefault(_LinePath);

var _AreaClosed = require('./shapes/AreaClosed');

var _AreaClosed2 = _interopRequireDefault(_AreaClosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Line: _Line2.default,
  LinePath: _LinePath2.default,
  AreaClosed: _AreaClosed2.default
};