import { scaleThreshold } from 'd3-scale';

export default ({ range, domain }) => {
  const scale = scaleThreshold();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);

  return scale;
};
