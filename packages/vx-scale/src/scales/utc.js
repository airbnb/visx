import { scaleUtc } from 'd3-scale';

export default ({ range, rangeRound, domain, nice = false, clamp = false }) => {
  const scale = scaleUtc();
  scale.type = 'utc';

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);

  return scale;
};
