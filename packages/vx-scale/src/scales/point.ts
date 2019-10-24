import { scalePoint } from 'd3-scale';

export default ({ range, rangeRound, domain, padding, align, nice = false }) => {
  const scale = scalePoint();
  scale.type = 'point';

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (padding) scale.padding(padding);
  if (align) scale.align(align);

  return scale;
};
