// @ts-ignore no type defs for symlog
import { scaleSymlog } from 'd3-scale';

export type SymlogConfig = {
  /** Sets the output values of the scale. */
  range?: any[];
  /** Sets the input values of the scale. */
  domain?: any[];
  /** Sets the symlog constant to the specified number, defaults to 1. */
  constant?: number;
};

export default function symLogScale({ range, domain, constant }: SymlogConfig) {
  const scale = scaleSymlog();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (constant) scale.constant(constant);

  // @ts-ignore
  scale.type = 'symlog';

  return scale;
}
