import { scaleTime } from 'd3-scale';

export type TimeConfig<Output> = {
  /** Sets the input values of the scale, which are Dates or coercible to numbers for time scales. */
  domain?: (Date | number | { valueOf(): number })[];
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the output values of the scale while setting its interpolator to round. If the elements are not numbers, they will be coerced to numbers. */
  rangeRound?: number[];
  /** Extends the domain so that it starts and ends on nice round values. */
  nice?: boolean;
  /** Whether the scale should clamp values to within the range. */
  clamp?: boolean;
};

export default function timeScale<Output>({
  range,
  rangeRound,
  domain,
  nice = false,
  clamp = false,
}: TimeConfig<Output>) {
  const scale = scaleTime<Output>();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);

  // @ts-ignore
  scale.type = 'time';

  return scale;
}
