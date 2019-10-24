import { scalePow } from 'd3-scale';

export default ({ range, rangeRound, domain, exponent, nice = false, clamp = false }) => {
  const scale = scalePow();
  scale.type = 'power';

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (exponent) scale.exponent(exponent);

  return scale;
};
