import { timeSecond, timeMinute, timeHour, timeDay, timeYear, timeMonth, timeWeek, utcSecond, utcMinute, utcHour, utcDay, utcWeek, utcMonth, utcYear } from 'd3-time';
import isUtcScale from '../utils/isUtcScale';
var localTimeIntervals = {
  day: timeDay,
  hour: timeHour,
  minute: timeMinute,
  month: timeMonth,
  second: timeSecond,
  week: timeWeek,
  year: timeYear
};
var utcIntervals = {
  day: utcDay,
  hour: utcHour,
  minute: utcMinute,
  month: utcMonth,
  second: utcSecond,
  week: utcWeek,
  year: utcYear
};
export default function applyNice(scale, config) {
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
      var isUtc = isUtcScale(timeScale);

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