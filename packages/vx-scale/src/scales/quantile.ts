import { scaleQuantile } from 'd3-scale';

export default ({ range, domain }) => {
  const scale = scaleQuantile();
  scale.type = 'quantile';

  if (range) scale.range(range);
  if (domain) scale.domain(domain);

  return scale;
};
