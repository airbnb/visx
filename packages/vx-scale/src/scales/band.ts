import { scaleBand } from 'd3-scale';

type StringLike = string | { valueOf(): string };
type Numeric = number | { valueOf(): number };

export type BandConfig<Datum extends StringLike> = {
  /** Sets the output values of the scale, which are numbers for band scales. */
  range?: [Numeric, Numeric];
  /** Sets the output values of the scale while setting its interpolator to round. If the elements are not numbers, they will be coerced to numbers. */
  rangeRound?: [Numeric, Numeric];
  /** Sets the input values of the scale, which are strings for band scales. */
  domain?: Datum[];
  /** 0-1, determines how any leftover unused space in the range is distributed. 0.5 distributes it equally left and right. */
  align?: number;
  /** 0-1, determines the ratio of the range that is reserved for blank space before the first point and after the last. */
  padding?: number;
  /** 0-1, determines the ratio of the range that is reserved for blank space _between_ bands. */
  paddingInner?: number;
  /** 0-1, determines the ratio of the range that is reserved for blank space before the first band and after the last band. */
  paddingOuter?: number;
  tickFormat?: unknown;
};

export default function bandScale<Datum extends StringLike = StringLike>({
  range,
  rangeRound,
  domain,
  padding,
  paddingInner,
  paddingOuter,
  align,
  tickFormat,
}: BandConfig<Datum>) {
  const scale = scaleBand<Datum>();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (padding) scale.padding(padding);
  if (paddingInner) scale.paddingInner(paddingInner);
  if (paddingOuter) scale.paddingOuter(paddingOuter);
  if (align) scale.align(align);

  // @TODO should likely get rid of these.
  // @ts-ignore
  if (tickFormat) scale.tickFormat = tickFormat;
  // @ts-ignore
  scale.type = 'band';

  return scale;
}
