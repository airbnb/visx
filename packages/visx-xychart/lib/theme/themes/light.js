"use strict";

exports.__esModule = true;
exports.default = void 0;

var _colors = require("../colors");

var _buildChartTheme = _interopRequireDefault(require("../buildChartTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _buildChartTheme.default)({
  backgroundColor: '#fff',
  colors: _colors.defaultColors,
  tickLength: 4,
  svgLabelSmall: {
    fill: _colors.grayColors[7]
  },
  svgLabelBig: {
    fill: _colors.grayColors[9]
  },
  gridColor: _colors.grayColors[5],
  gridColorDark: _colors.grayColors[9]
});

exports.default = _default;