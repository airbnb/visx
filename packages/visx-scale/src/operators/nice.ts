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
import isUtcScale from '../utils/isUtcScale';

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

export default function applyNice<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
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
        const parsedInterval = (
          isUtc ? utcIntervals[interval] : localTimeIntervals[interval]
        ).every(step);
        if (parsedInterval != null) {
          timeScale.nice(parsedInterval as CountableTimeInterval);
        }
      }
    }
  }
}
