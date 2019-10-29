import { scaleOrdinal } from 'd3-scale';

export type OrdinalConfig<Output> = {
  /** Sets the input values of the scale, which are strings for an ordinal scale. */
  domain?: string[];
  /** Sets the output values of the scale. */
  range?: Output[];
  /** Sets the output value of the scale for unknown input values. */
  unknown?: Output | { name: 'implicit' };
};

export default function ordinalScale<Output>({ range, domain, unknown }: OrdinalConfig<Output>) {
  const scale = scaleOrdinal<Output>();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (unknown) scale.unknown(unknown);

  // @ts-ignore
  scale.type = 'ordinal';

  return scale;
}
