import { scaleSymlog } from 'd3-scale';

export default ({ range, domain, constant }) => {
  const scale = scaleSymlog();
  scale.type = 'symlog';

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (constant) scale.constant(constant);

  return scale;
};
