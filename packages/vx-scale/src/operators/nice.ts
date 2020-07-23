import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeYear,
  timeMonth,
  timeWeek,
  utcSecond,
  utcMinute,
  utcHour,
  utcDay,
  utcWeek,
  utcMonth,
  utcYear,
  CountableTimeInterval,
} from 'd3-time';
import { ScaleTime } from 'd3-scale';
import { StringLike } from '../types/Base';
import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';
import { NiceTime } from '../types/Nice';

const localTimeIntervals: {
  [key in NiceTime]: CountableTimeInterval;
} = {
  day: timeDay,
  hour: timeHour,
  minute: timeMinute,
  month: timeMonth,
  second: timeSecond,
  week: timeWeek,
  year: timeYear,
};

const utcIntervals: {
  [key in NiceTime]: CountableTimeInterval;
} = {
  day: utcDay,
  hour: utcHour,
  minute: utcMinute,
  month: utcMonth,
  second: utcSecond,
  week: utcWeek,
  year: utcYear,
};

const TEST_TIME = new Date(Date.UTC(2020, 1, 2, 3, 4, 5));
const TEST_FORMAT = '%Y-%m-%d %H:%M';

/**
 * Check if the scale is utc or time scale
 * @param scale time or utc scale
 */
function isUtcScale<Output>(scale: ScaleTime<Output, Output>) {
  // The only difference between time and utc scale is
  // whether the tick format is utcFormat or timeFormat
  return scale.tickFormat(1, TEST_FORMAT)(TEST_TIME) === '2020-02-01 19:04';
}

export default function applyNice<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('nice' in config && typeof config.nice !== 'undefined' && 'nice' in scale) {
    const { nice } = config;
    if (typeof nice === 'boolean') {
      if (nice) {
        scale.nice();
      }
    } else if (typeof nice === 'number') {
      scale.nice(nice);
    } else {
      const timeScale = scale as ScaleTime<Output, Output>;
      const isUtc = isUtcScale(timeScale);
      if (typeof nice === 'string') {
        timeScale.nice(isUtc ? utcIntervals[nice] : localTimeIntervals[nice]);
      } else {
        const { interval, step } = nice;
        const parsedInterval = (isUtc
          ? utcIntervals[interval]
          : localTimeIntervals[interval]
        ).every(step);
        if (parsedInterval !== null) {
          timeScale.nice(parsedInterval as CountableTimeInterval);
        }
      }
    }
  }
}
