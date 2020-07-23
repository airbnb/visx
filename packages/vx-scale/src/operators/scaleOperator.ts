import { DefaultThresholdInput, PickD3Scale } from '../types/Scale';
import { ScaleType, PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { Value, StringLike } from '../types/Base';
import domain from './domain';
import range from './range';
import clamp from './clamp';
import interpolate from './interpolate';
import nice from './nice';
import round from './round';
import zero from './zero';

const operators = {
  // domain => nice => zero
  domain,
  nice,
  zero,

  // interpolate before round
  interpolate,
  round,

  // Order does not matter for these operators
  range,
  clamp,
};

type OperatorType = keyof typeof operators;

const orderedOps = Object.keys(operators) as OperatorType[];

export default function scaleOperator<T extends ScaleType>(...ops: OperatorType[]) {
  const selection = new Set(ops);
  const selectedOps = orderedOps.filter(o => selection.has(o));

  return function applyOperators<
    Output = Value,
    DiscreteInput extends StringLike = StringLike,
    ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
  >(
    scale: PickD3Scale<T, Output, DiscreteInput, ThresholdInput>,
    config: PickScaleConfigWithoutType<T, Output, DiscreteInput, ThresholdInput>,
  ) {
    selectedOps.forEach(op => {
      operators[op]<Output, DiscreteInput, ThresholdInput>(scale, config);
    });

    return scale;
  };
}
