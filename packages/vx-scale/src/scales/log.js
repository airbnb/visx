import { scaleLog } from 'd3-scale';

export default ({ range, rangeRound, domain, base, nice = false, clamp = false }) => {
  const scale = scaleLog();
  scale.type = 'log';

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (base) scale.base(base);

  return scale;
};
