import { scaleThreshold } from 'd3-scale';

export type ThresholdConfig<Input, Output> = {
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the input values of the scale. */
  domain?: Input[];
};

export default function thresholdScale<Input extends number | string | Date, Output>({
  range,
  domain,
}: ThresholdConfig<Input, Output>) {
  const scale = scaleThreshold<Input, Output>();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);

  // @ts-ignore
  scale.type = 'threshold';

  return scale;
}
