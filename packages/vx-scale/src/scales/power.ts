import { scalePow } from 'd3-scale';

export type PowerConfig<Output> = {
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the output values of the scale while setting its interpolator to round. They need not be numbers, though numbers are required for invert. */
  rangeRound?: number[];
  /** Sets the input values of the scalem which are numbers for a power scale. */
  domain?: number[];
  /** Sets the scale's exponent to the given number, defaults to 1. This is effectively a linear scale until you set a different exponent. */
  exponent?: number;
  /** Extends the domain so that it starts and ends on nice round values. */
  nice?: boolean;
  /** Whether the scale should clamp values to within the range. */
  clamp?: boolean;
};

export default function powerScale<Output>({
  range,
  rangeRound,
  domain,
  exponent,
  nice = false,
  clamp = false,
}: PowerConfig<Output>) {
  const scale = scalePow<Output>();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (exponent) scale.exponent(exponent);

  // @ts-ignore
  scale.type = 'power';

  return scale;
}
