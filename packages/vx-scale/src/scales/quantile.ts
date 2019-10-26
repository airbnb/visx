import { scaleQuantile } from 'd3-scale';

export type QuantileConfig<Output> = {
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the input values of the scale. */
  domain?: (number | null | undefined)[];
};

export default function quantileScale<Output>({ range, domain }: QuantileConfig<Output>) {
  const scale = scaleQuantile<Output>();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);

  // @ts-ignore
  scale.type = 'quantile';

  return scale;
}
