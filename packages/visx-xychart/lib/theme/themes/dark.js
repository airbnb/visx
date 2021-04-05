"use strict";

exports.__esModule = true;
exports.default = void 0;

var _colors = require("../colors");

var _buildChartTheme = _interopRequireDefault(require("../buildChartTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _buildChartTheme.default)({
  backgroundColor: '#222',
  colors: [_colors.allColors.cyan[4], _colors.allColors.teal[1], _colors.allColors.yellow[2], _colors.allColors.red[4], _colors.allColors.grape[3], _colors.allColors.grape[6], _colors.allColors.pink[3]],
  tickLength: 4,
  svgLabelSmall: {
    fill: _colors.grayColors[2]
  },
  svgLabelBig: {
    fill: _colors.grayColors[0]
  },
  gridColor: _colors.grayColors[4],
  gridColorDark: _colors.grayColors[1]
});

exports.default = _default;