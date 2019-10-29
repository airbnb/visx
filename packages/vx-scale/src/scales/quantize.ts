import { scaleQuantize } from 'd3-scale';

export type QuantizeConfig<Output> = {
  /** Sets the output values of the scale, which are numbers for point scales. */
  range?: Output[];
  /** Sets the input values of the scale. */
  domain?: [number, number];
  /** Extends the domain so that it starts and ends on nice round values. */
  nice?: boolean;
  /** Optional approximate number of ticks to be returned. */
  ticks?: number;
  /** Specifies an approximate tick count and valid format specifier string. */
  tickFormat?: [number, string];
};

export default function quantizeScale<Output>({
  range,
  domain,
  ticks,
  tickFormat,
  nice = false,
}: QuantizeConfig<Output>) {
  const scale = scaleQuantize<Output>();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (ticks) scale.ticks(ticks);
  if (tickFormat) scale.tickFormat(...tickFormat);

  // @ts-ignore
  scale.type = 'quantize';

  return scale;
}
