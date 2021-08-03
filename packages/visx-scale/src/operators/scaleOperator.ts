import { DefaultThresholdInput, PickD3Scale } from '../types/Scale';
import { ScaleType, PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { DefaultOutput, StringLike } from '../types/Base';
import domain from './domain';
import range from './range';
import align from './align';
import base from './base';
import clamp from './clamp';
import constant from './constant';
import exponent from './exponent';
import interpolate from './interpolate';
import nice from './nice';
import padding from './padding';
import reverse from './reverse';
import round from './round';
import unknown from './unknown';
import zero from './zero';

/**
 * List of all operators, in order of execution
 */
export const ALL_OPERATORS = [
  // domain => nice => zero
  'domain',
  'nice',
  'zero',

  // interpolate before round
  'interpolate',
  'round',

  // set range then reverse
  'range',
  'reverse',

  // Order does not matter for these operators
  'align',
  'base',
  'clamp',
  'constant',
  'exponent',
  'padding',
  'unknown',
] as const;

type OperatorType = typeof ALL_OPERATORS[number];

// Use Record to enforce that all keys in OperatorType must exist.
const operators: Record<OperatorType, typeof domain> = {
  domain,
  nice,
  zero,
  interpolate,
  round,
  align,
  base,
  clamp,
  constant,
  exponent,
  padding,
  range,
  reverse,
  unknown,
};

export default function scaleOperator<T extends ScaleType>(...ops: OperatorType[]) {
  const selection = new Set(ops);
  const selectedOps = ALL_OPERATORS.filter((o) => selection.has(o));

  return function applyOperators<
    Output = DefaultOutput,
    DiscreteInput extends StringLike = StringLike,
    ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  >(
    scale: PickD3Scale<T, Output, DiscreteInput, ThresholdInput>,
    config?: PickScaleConfigWithoutType<T, Output, DiscreteInput, ThresholdInput>,
  ) {
    if (typeof config !== 'undefined') {
      selectedOps.forEach((op) => {
        operators[op]<Output, DiscreteInput, ThresholdInput>(scale, config);
      });
    }

    return scale;
  };
}
