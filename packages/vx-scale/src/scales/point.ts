import { scalePoint } from 'd3-scale';

export type PointConfig<Input> = {
  /** Sets the output values of the scale, which are numbers for point scales. */
  range?: [number, number];
  /** Sets the output values of the scale while setting its interpolator to round. */
  rangeRound?: [number, number];
  /** Sets the input values of the scale. */
  domain?: Input[];
  /** 0-1, determines the ratio of the range that is reserved for blank space before the first point and after the last. */
  padding?: number;
  /** 0-1, determines how any leftover unused space in the range is distributed. 0.5 distributes it equally left and right. */
  align?: number;
};

export default function pointScale<Input>({
  range,
  rangeRound,
  domain,
  padding,
  align,
}: PointConfig<Input>) {
  const scale = scalePoint<Input>();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (padding) scale.padding(padding);
  if (align) scale.align(align);

  // @ts-ignore
  scale.type = 'point';

  return scale;
}
