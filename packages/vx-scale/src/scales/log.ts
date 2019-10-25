import { scaleLog } from 'd3-scale';

export type LogConfig<Output> = {
  /** Sets the input values of the scale, which are numbers for a log scale. */
  domain?: number[];
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the output values of the scale while setting its interpolator to round. If the elements are not numbers, they will be coerced to numbers. */
  rangeRound?: number[];
  /** Sets the base for this logarithmic scale (defaults to 10). */
  base?: number;
  /** Extends the domain so that it starts and ends on nice round values. */
  nice?: boolean;
  /** Whether the scale should clamp values to within the range. */
  clamp?: boolean;
};

export default function logScale<Output>({
  range,
  rangeRound,
  domain,
  base,
  nice = false,
  clamp = false,
}: LogConfig<Output>) {
  const scale = scaleLog<Output>();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (base) scale.base(base);

  // @ts-ignore
  scale.type = 'log';

  return scale;
}
