import { scaleBand } from 'd3-scale';

type Domain = string | { valueOf(): string };
type Range = number | { valueOf(): number };

export type BandConfig = {
  /** Sets the output values of the scale, which are numbers for band scales. */
  range?: [Range, Range];
  /** Sets the output values of the scale while setting its interpolator to round. If the elements are not numbers, they will be coerced to numbers. */
  rangeRound?: [Range, Range];
  /** Sets the input values of the scale, which are strings for band scales. */
  domain?: Domain[];
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

export default ({
  range,
  rangeRound,
  domain,
  padding,
  paddingInner,
  paddingOuter,
  align,
  tickFormat,
}: BandConfig) => {
  const scale = scaleBand<Domain>();

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
};
