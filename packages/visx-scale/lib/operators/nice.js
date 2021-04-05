"use strict";

exports.__esModule = true;
exports.default = applyNice;

var _d3Time = require("d3-time");

var _isUtcScale = _interopRequireDefault(require("../utils/isUtcScale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localTimeIntervals = {
  day: _d3Time.timeDay,
  hour: _d3Time.timeHour,
  minute: _d3Time.timeMinute,
  month: _d3Time.timeMonth,
  second: _d3Time.timeSecond,
  week: _d3Time.timeWeek,
  year: _d3Time.timeYear
};
var utcIntervals = {
  day: _d3Time.utcDay,
  hour: _d3Time.utcHour,
  minute: _d3Time.utcMinute,
  month: _d3Time.utcMonth,
  second: _d3Time.utcSecond,
  week: _d3Time.utcWeek,
  year: _d3Time.utcYear
};

function applyNice(scale, config) {
  if ('nice' in config && typeof config.nice !== 'undefined' && 'nice' in scale) {
    var nice = config.nice;

    if (typeof nice === 'boolean') {
      if (nice) {
        scale.nice();
      }
    } else if (typeof nice === 'number') {
      scale.nice(nice);
    } else {
      var timeScale = scale;
      var isUtc = (0, _isUtcScale.default)(timeScale);

      if (typeof nice === 'string') {
        timeScale.nice(isUtc ? utcIntervals[nice] : localTimeIntervals[nice]);
      } else {
        var interval = nice.interval,
            step = nice.step;
        var parsedInterval = (isUtc ? utcIntervals[interval] : localTimeIntervals[interval]).every(step);

        if (parsedInterval != null) {
          timeScale.nice(parsedInterval);
        }
      }
    }
  }
}