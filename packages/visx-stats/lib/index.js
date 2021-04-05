"use strict";

exports.__esModule = true;
exports.computeStats = exports.ViolinPlot = exports.BoxPlot = void 0;

var _BoxPlot = _interopRequireDefault(require("./BoxPlot"));

exports.BoxPlot = _BoxPlot.default;

var _ViolinPlot = _interopRequireDefault(require("./ViolinPlot"));

exports.ViolinPlot = _ViolinPlot.default;

var _computeStats = _interopRequireDefault(require("./util/computeStats"));

exports.computeStats = _computeStats.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }